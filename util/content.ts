import { createClient } from 'contentful';
import { slug } from './generic';

import type {
  Entry,
  IActions,
  PageAttrs,
  PageParsed,
  FooterItem,
  IDocsGroup,
  PageContent,
  FooterGroup,
  GlobalConfig,
  IDocsArticle,
  HomepageContent,
  GlobalConfigPre,
  EntryCollection,
  IDocsGroupEntry,
  FooterGroupEntry,
  PageContentParsed,
  IMeasuredGeoPoint,
} from '~/types';

import type { CreateClientParams } from 'contentful';

const debug = (item: any, exclude: string[] = []) => {
  if (item.constructor.name === 'Object') {
    const excluded = Object.keys(item).reduce(obj => removeKey(item, obj, exclude), Object());
    return console.dir(excluded, { depth: null });
  }
  return console.dir(item, { depth: null });
};

const client = (preview: boolean = false) => {
  const options = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? '',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
  } as CreateClientParams;
  if (preview) {
    options.host = 'preview.contentful.com';
    options.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN ?? '';
  }
  return createClient(options);
};

/**
 * Query Contentful for a specific content_type
 */
export async function contentQuery<T extends unknown>(
  contentType: string,
  preview: boolean = false,
  query?: Dict,
): Promise<EntryCollection<T>> {
  let queryParams = { content_type: contentType };
  if (query) {
    queryParams = { ...queryParams, ...query };
  }
  try {
    const entries = await client(preview).getEntries<T>(queryParams);
    return entries;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getEntry<T extends unknown>(
  entryId: string,
  query: Dict = {},
): Promise<Entry<T>> {
  try {
    return await client().getEntry<T>(entryId, query);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getGeoPoints = async (): Promise<IMeasuredGeoPoint[]> => {
  let geoPoints = [] as IMeasuredGeoPoint[];
  const data = await contentQuery<IMeasuredGeoPoint>('orionLocation');
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
export async function getPage<T extends PageAttrs>(pageSlug: string, preview: boolean): Promise<T> {
  let page = { id: '', title: '', slug: '' } as T;
  const data = await contentQuery('page', preview, { 'fields.slug': pageSlug });
  if (data.total !== 0) {
    const fields = Object(data.items[0].fields);
    if (!fields.customProperties) {
      fields.customProperties = {};
    }
    page = { id: data.items[0].sys.id, ...fields };
  }
  return page;
}

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
      let __type = '';
      if (item.sys.type in includes) {
        for (const ref of includes[item.sys.type] ?? []) {
          if (ref?.sys?.id === item.sys?.id) {
            if ('contentType' in ref.sys) {
              __type = ref.sys.contentType.sys.id;
            } else if (ref.sys.type === 'Asset') {
              __type = ref.fields.file.contentType;
            }

            item = {
              __type,
              id: item.sys.id,
              updatedAt: item.sys.updatedAt,
              ...ref.fields,
            };
          }
        }
      }
    }
  } else if (item.constructor.name === 'Array') {
    item = Array.from(val);
    return item.map((i: any) => getRefValue(i, includes));
  }
  if (item.constructor.name === 'Object') {
    for (const [k, v] of Object.entries<any>(item)) {
      if (v.constructor.name === 'Object') {
        item[k] = getRefValue(v, includes);
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
      const fetched = await client().getEntry(item.sys.id);
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
  const outputObj = Object(newObj);
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
  const pageContent = Object();
  const data = await contentQuery<HomepageContent>('homepage');

  if (data.total !== 0) {
    const item = data.items?.[0] ?? Object();
    const includes = data.includes ?? {};

    for (const [k, v] of Object.entries(item.fields)) {
      pageContent[k] = getRefValue(v, includes);
    }
  }
  return pageContent;
};

export const getGlobalConfig = async (preview: boolean = false): Promise<GlobalConfig> => {
  const removeKeys = ['themeName'];
  const globalConfig = Object();
  const data = await contentQuery('globalConfiguration', preview, { include: 4 });
  if (data.total !== 0) {
    const parsed: EntryCollection<GlobalConfigPre> = await client().parseEntries(data);
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
function* parseEntryItems<E>(items: Entry<E>[], includes: EntryCollection<any>): Generator<E> {
  for (const i of items) {
    const item = Object();

    if ('sys' in i && 'contentType' in i.sys && 'sys' in i.sys.contentType) {
      item.__type = i.sys.contentType.sys.id;
    }
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

function isDocsGroups(obj: any): obj is IDocsGroup {
  const type = obj.__type ?? '';
  return type === 'docsGroup';
}

function* parseFooterItems(
  data: EntryCollection<PageAttrs | PageContent | IDocsGroupEntry>,
): Generator<FooterItem> {
  if (data.total !== 0) {
    const items = data.items;
    const includes = data.includes;

    // Page OR Page Content if it has a footerGroup
    const entryItems = parseEntryItems(items, includes) as Generator<
      PageParsed | PageContentParsed | IDocsGroup
    >;

    for (const entryItem of entryItems) {
      // Single footer link
      if (typeof entryItem.footerGroup !== 'undefined') {
        const footerItem = {
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
        if (entryItem.footerGroup && isDocsGroups(entryItem)) {
          if (entryItem.slug !== 'docs') {
            footerItem.href = `/docs/${entryItem.slug}`;
          } else {
            footerItem.href = `/${entryItem.slug}`;
          }
          footerItem.sortWeight = 10;
        } else if (entryItem.footerGroup && isPageAttrs(entryItem)) {
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
}

/**
 * Parse a FooterItem from external link models.
 */
function* parseExternalFooterLinks(data: EntryCollection<FooterGroupEntry>): Generator<FooterItem> {
  if (data.total !== 0) {
    const { items, includes } = data;

    // All Footer Groups with external links referenced.
    const entryItems = parseEntryItems(items, includes) as Generator<FooterGroup>;

    for (const entryItem of entryItems) {
      if (entryItem.externalLinks) {
        for (const externalLink of entryItem.externalLinks) {
          // Single footer link
          const footerItem = {
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
export async function getPageContent(
  pageId: string,
  preview: boolean = false,
): Promise<PageContent[]> {
  const pageContent = [];
  const data = await contentQuery<PageContent>('pageContent', preview, {
    'fields.page.sys.id': pageId,
  });

  if (data.total !== 0) {
    const items = data.items;
    const includes = data.includes ?? {};

    for (const i of items) {
      const item = Object();
      for (const [k, v] of Object.entries(i.fields)) {
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
export async function getContent<T extends unknown>(
  contentType: string,
  preview: boolean = false,
  filters: object = {},
): Promise<Array<T>> {
  const content = [];
  const data = await contentQuery<T>(contentType, preview, filters);
  if (data.total !== 0) {
    const { items, includes = {} } = data;
    for (const item of parseEntryItems(items, includes)) {
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
export async function getFooterItems(preview: boolean = false): Promise<FooterItem[]> {
  const footerItems = [];
  const pageContentData = await contentQuery<PageContent>('pageContent', preview, {
    'fields.footerGroup[exists]': true,
  });
  const pageData = await contentQuery<PageAttrs>('page', preview, {
    'fields.footerGroup[exists]': true,
  });
  const docsGroups = await contentQuery<IDocsGroup>('docsGroup', preview, {
    'fields.footerGroup[exists]': true,
  });
  const footerGroups = await contentQuery<FooterGroupEntry>('footerGroup', preview, {
    'fields.externalLinks[exists]': true,
  });
  // Parse Page & PageContent references as they use the same model.
  for (const data of [pageContentData, pageData, docsGroups]) {
    footerItems.push(...parseFooterItems(data));
  }
  // Because externalLinks are attached to a different model, they must be parsed
  // slightly differently.
  for (const link of parseExternalFooterLinks(footerGroups)) {
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
  const pageInfo = [];
  const pages: EntryCollection<PageAttrs> = await contentQuery('page');
  for (const { fields } of pages.items) {
    const { title, subtitle, slug, footerTitle } = fields;
    pageInfo.push({ title, subtitle, slug, footerTitle });
  }
  return pageInfo;
}

export async function getActions(preview: boolean = false): Promise<IActions[]> {
  const actions = [];
  const data: PageContentParsed[] = await getContent('pageContent', preview, {
    'fields.showInCallToAction': true,
  });
  for (const item of data) {
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

export async function getDocsGroups(): Promise<IDocsGroup[]> {
  let docsGroups = [] as IDocsGroup[];
  const groups = await contentQuery<IDocsGroupEntry>('docsGroup');
  const articles = await contentQuery<IDocsArticle>('docsArticle');
  docsGroups = [...parseEntryItems<IDocsGroupEntry>(groups.items, groups.includes)].map(d => ({
    ...d,
    items: [] as IDocsArticle[],
  }));
  for (const article of parseEntryItems<IDocsArticle>(articles.items, articles.includes)) {
    for (const group of docsGroups) {
      if (article.docsGroup?.title === group.title) {
        group.items.push(article);
      }
    }
  }
  return docsGroups;
}
