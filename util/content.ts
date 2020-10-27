import { createClient } from 'contentful';
import { slug } from './generic';

import type {
  PageAttrs,
  PageContent,
  HomepageContent,
  GlobalConfigPre,
  GlobalConfig,
  Entry,
  EntryCollection,
  PageParsed,
  PageContentParsed,
  FooterItem,
  AnyEntry,
  FooterGroup,
  FooterGroupEntry,
  IActions,
  IMeasuredGeoPoint,
} from 'site/types';

const debug = (obj: any) => {
  return console.dir(obj, { depth: null });
};

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
});

/**
 * Query Contentful for a specific content_type
 */
export const contentQuery = async (
  contentType: string,
  query?: object,
): Promise<EntryCollection<any>> => {
  let queryParams = { content_type: contentType };
  if (query) {
    queryParams = { ...queryParams, ...query };
  }
  try {
    const entries = await client.getEntries(queryParams);
    return entries;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getEntry = async (entryId: string, query: Object = Object()): Promise<Entry<any>> => {
  try {
    const entry = await client.getEntry(entryId, query);
    return entry;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getGeoPoints = async (): Promise<IMeasuredGeoPoint[]> => {
  let geoPoints = [] as IMeasuredGeoPoint[];
  const data = await contentQuery('orionLocation');
  if (data.total !== 0) {
    /**
     * Add default values for cloud locations - this ensures type safety but also signals to
     * components if the location has been checked.
     */
    geoPoints = data.items.map(p => ({ ...p.fields, elapsed: 65535, best: false }));
  }
  return geoPoints;
};

/**
 * Get all pages
 */
export const getPages = async (): Promise<PageAttrs[]> => {
  let pages = [];
  const data = await contentQuery('page');
  if (data.total !== 0) {
    pages = data.items.map(e => ({ id: e.sys.id, ...Object(e.fields) }));
  }
  return pages;
};

/**
 * Get Page by slug
 */
export const getPage = async (pageSlug: string): Promise<PageAttrs> => {
  let page = { id: '', title: '', slug: '' };
  const data = await contentQuery('page', { 'fields.slug': pageSlug });
  if (data.total !== 0) {
    const fields = Object(data.items[0].fields);
    if (!fields.customProperties) {
      fields.customProperties = {};
    }
    page = { id: data.items[0].sys.id, ...fields };
  }
  return page;
};

/**
 * Match a reference with its `includes` entry, and replace the reference
 * with the real entry.
 */
const getRefValue = (val: any, includes: any = Object()): any => {
  let item = val ?? null;
  if (item === null || typeof item === 'undefined') {
    return null;
  } else if (item.constructor.name === 'Object') {
    item = Object(val);
    if ('sys' in item) {
      if (item.sys.type in includes) {
        for (let ref of includes[item.sys.type] ?? []) {
          if (ref?.sys?.id === item.sys?.id) {
            item = { id: item.sys.id, updatedAt: item.sys.updatedAt, ...ref.fields };
          }
        }
      }
    }
  } else if (item.constructor.name === 'Array') {
    item = Array.from(val);
    return item.map((i: any) => getRefValue(i, includes));
  }
  if (item.constructor.name === 'Object') {
    for (let [k1, v1] of Object.entries<any>(item)) {
      if (v1.constructor.name === 'Object') {
        item[k1] = getRefValue(v1, includes);
      }
    }
  }
  return item;
};

const fetchRefValue = async (val: any): Promise<any> => {
  let item = val ?? null;
  if (item === null || typeof item === 'undefined') {
    return null;
  } else if (item.constructor.name === 'Object') {
    item = Object(val);
    if ('sys' in item) {
      const fetched = await client.getEntry(item.sys.id);
      return fetched.fields;
    } else {
      return item;
    }
  } else if (item.constructor.name === 'Array') {
    item = Array.from(val);
    return Promise.all(item.map((i: any) => fetchRefValue(i)));
  } else {
    return item;
  }
};

const removeKey = (oldObj: object, newObj: object, [...toRemove]: string[]): object => {
  let outputObj = Object(newObj);
  for (let [k, v] of Object.entries(oldObj)) {
    if (!toRemove.includes(k)) {
      if (v.constructor.name === 'Object') {
        v = removeKey(v, {}, toRemove);
      }
      outputObj[k] = v;
    }
  }
  return outputObj;
};

const flattenObj = (item: object, [...del]: string[] = []): object => {
  let flattened = Object.keys(item).reduce(obj => removeKey(item, obj, del), Object());
  const flat = (i: object): object => {
    let f = Object(i);
    for (let [k, v] of Object.entries(i)) {
      f[k] = v.fields;
    }
    return f;
  };
  if ('fields' in Object.keys(flattened)) {
    flattened = flat(flattened.fields);
  } else {
    flattened = flat(flattened);
  }
  return flattened;
};

export const getHomePage = async (): Promise<HomepageContent> => {
  let pageContent = Object();
  const data = await contentQuery('homepage');

  if (data.total !== 0) {
    const item = data.items?.[0] ?? Object();
    const includes = data.includes ?? {};

    for (let [k, v] of Object.entries(item.fields)) {
      pageContent[k] = getRefValue(v, includes);
    }
  }
  return pageContent;
};

export const getGlobalConfig = async (): Promise<GlobalConfig> => {
  const removeKeys = ['themeName'];
  let globalConfig = Object();
  const data = await contentQuery('globalConfiguration', { include: 4 });
  if (data.total !== 0) {
    const parsed: EntryCollection<GlobalConfigPre> = await client.parseEntries(data);
    const { theme, ...rest } = parsed.items[0].fields;
    Object.assign(globalConfig, {
      theme: flattenObj(theme.fields, removeKeys),
      ...rest,
    });
  }
  return globalConfig;
};

/**
 * Recursively parse the data from referenced entries.
 */
function* parseEntryItems(items: AnyEntry[], includes: EntryCollection<any>): Generator<any> {
  for (let i of items) {
    let item = Object();
    for (let [k, v] of Object.entries(i.fields)) {
      item[k] = getRefValue(v, includes);
    }
    yield item;
  }
}

function isPageAttrs(obj: any): obj is PageParsed {
  return 'slug' in obj;
}

function isPageContent(obj: any): obj is PageContentParsed {
  return 'paragraphs' in obj;
}

function* parseFooterItems(data: EntryCollection<PageAttrs | PageContent>): Generator<FooterItem> {
  if (data.total !== 0) {
    const items = data.items;
    const includes = data.includes;

    // Page OR Page Content if it has a footerGroup
    const entryItems: Generator<PageParsed | PageContentParsed> = parseEntryItems(items, includes);

    for (let entryItem of entryItems) {
      // Single footer link
      let footerItem = {
        // Reference to parent group
        footerGroup: {
          title: entryItem.footerGroup.title,
          sortWeight: entryItem.footerGroup.sortWeight,
        },
        // Link attributes
        title: entryItem.footerTitle ?? entryItem.title,
        href: '#',
        // Set a very high default sortWeight in case one is not set.
        sortWeight: 255,
      };

      if (entryItem.footerGroup && isPageAttrs(entryItem)) {
        footerItem.href = `/${entryItem.slug}`;
        // Sort Pages over Page Content.
        footerItem.sortWeight = 10;
      } else if (entryItem.footerGroup && isPageContent(entryItem)) {
        footerItem.href = slug(entryItem.title, entryItem.page.slug);
        // Add 1 to the sortWeight to account for the page.
        footerItem.sortWeight = entryItem.sortWeight + 10;
      }
      yield footerItem;
    }
  }
}

/**
 * Parse a FooterItem from external link models.
 */
function* parseExternalFooterLinks(data: EntryCollection<FooterGroupEntry>): Generator<FooterItem> {
  if (data.total !== 0) {
    const { items, includes } = data;

    // All Footer Groups with external links referenced.
    const entryItems: Generator<FooterGroup> = parseEntryItems(items, includes);

    for (let entryItem of entryItems) {
      if (entryItem.externalLinks) {
        for (let externalLink of entryItem.externalLinks) {
          // Single footer link
          let footerItem = {
            // Reference to parent group
            footerGroup: {
              title: entryItem.title,
              sortWeight: entryItem.sortWeight,
            },
            // Link attributes
            title: externalLink.title,
            href: externalLink.href,
            sortWeight: externalLink.sortWeight ?? 255,
          };
          yield footerItem;
        }
      }
    }
  }
}

/**
 * Get content for a specific page by its sys.id
 */
export async function getPageContent(pageId: string): Promise<PageContent[]> {
  let pageContent = [];
  const data = await contentQuery('pageContent', {
    'fields.page.sys.id': pageId,
  });

  if (data.total !== 0) {
    const items = data.items;
    const includes = data.includes ?? {};

    for (let i of items) {
      let item = Object();
      for (let [k, v] of Object.entries(i.fields)) {
        item[k] = getRefValue(v, includes);
      }
      item.updatedAt = i.sys.updatedAt;
      pageContent.push(item);
    }
  }
  return pageContent;
}

/**
 * Retrieve & parse any content type.
 */
export async function getContent(contentType: string, filters: object = {}): Promise<Array<any>> {
  let content = [];
  const data = await contentQuery(contentType, filters);
  if (data.total !== 0) {
    const { items, includes = {} } = data;
    for (let item of parseEntryItems(items, includes)) {
      content.push(item);
    }
  }
  return content;
}

/**
 * Get Pages & Page Content with footerGroups defined, and footerGroups with externalLinks defined,
 * back reference each footer group & its items to build a single array of all footer links.
 *
 * Each footer link contains its parent's title & sortWeight as well as its own title, link, and
 * sortWeight.
 */
export async function getFooterItems(): Promise<FooterItem[]> {
  let footerItems = [];
  const pageContentData = await contentQuery('pageContent', { 'fields.footerGroup[exists]': true });
  const pageData = await contentQuery('page', { 'fields.footerGroup[exists]': true });
  const footerGroups = await contentQuery('footerGroup', {
    'fields.externalLinks[exists]': true,
  });
  // Parse Page & PageContent references as they use the same model.
  for (let data of [pageContentData, pageData]) {
    footerItems.push(...parseFooterItems(data));
  }
  // Because externalLinks are attached to a different model, they must be parsed
  // slightly differently.
  for (let link of parseExternalFooterLinks(footerGroups)) {
    footerItems.push(link);
  }
  return footerItems;
}

/**
 * Build an object usable by a select element from a single display name string.
 */
export function buildSelections(opt: string): { value: string; label: string } {
  const value = opt.toLowerCase().replaceAll(/[^A-Za-z0-9-_]/g, '_');
  return { value, label: opt };
}

/**
 * Build an array of each page's basic attributes.
 */
export async function getPageInfo() {
  let pageInfo = [];
  const pages: EntryCollection<PageAttrs> = await contentQuery('page');
  for (let { fields } of pages.items) {
    const { title, subtitle, slug, footerTitle } = fields;
    pageInfo.push({ title, subtitle, slug, footerTitle });
  }
  return pageInfo;
}

export async function getActions(): Promise<IActions[]> {
  let actions = [];
  const data: PageContentParsed[] = await getContent('pageContent', {
    'fields.showInCallToAction': true,
  });
  for (let item of data) {
    const {
      page,
      body,
      title,
      subtitle,
      callToActionIcon,
      callToActionBody,
      callToActionIconColor,
    } = item;
    actions.push({
      page,
      body,
      title,
      subtitle,
      callToActionIcon,
      callToActionBody,
      callToActionIconColor,
    });
  }
  return actions;
}
