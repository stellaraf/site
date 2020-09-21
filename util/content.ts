import { createClient } from 'contentful';
import { slug } from './slug';

import type {
  PageAttrs,
  PageContent,
  HomepageContent,
  GeoPoint,
  BioEntry,
  GlobalConfigPre,
  GlobalConfig,
  Entry,
  EntryCollection,
  PageParsed,
  PageContentParsed,
  FooterItem,
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

export const getGeoPoints = async (): Promise<GeoPoint[]> => {
  let geoPoints = [];
  const data = await contentQuery('orionLocation');
  if (data.total !== 0) {
    geoPoints = data.items.map(p => p.fields);
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
    page = { id: data.items[0].sys.id, ...Object(data.items[0].fields) };
  }
  return page;
};

/**
 * Match a reference with its `includes` entry, and replace the reference
 * with the real entry.
 */
const getRefValue = (val: any, includes: any = {}): any => {
  let item = val ?? null;
  if (item === null || typeof item === 'undefined') {
    return null;
  } else if (item.constructor.name === 'Object') {
    item = Object(val);
    if ('sys' in item && item.sys.type in includes) {
      for (let ref of includes[item.sys.type] ?? []) {
        if (ref?.sys?.id === item.sys?.id) {
          item = { id: item.sys.id, ...ref.fields };
        }
      }
    }
  } else if (item.constructor.name === 'Array') {
    item = Array.from(val);
    return item.map((i: any) => getRefValue(i, includes));
  }
  if (item.constructor.name === 'Object') {
    for (let [k1, v1] of Object.entries(item)) {
      if (v1.constructor.name === 'Object') {
        for (let [k2, v2] of Object.entries(v1)) {
          item[k1][k2] = getRefValue(v2, includes);
        }
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
  let flattened = Object.keys(item).reduce(obj => removeKey(item, obj, del), {});
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
    const { bioList, theme, ...rest } = parsed.items[0].fields;
    Object.assign(globalConfig, {
      theme: flattenObj(theme.fields, removeKeys),
      bioListId: bioList.sys.id,
      ...rest,
    });
  }
  return globalConfig;
};

function* parseEntryItems(items: Entry<PageAttrs | PageContent>[], includes): Generator<any> {
  for (let i of items) {
    let item = Object();
    for (let [k, v] of Object.entries(i.fields)) {
      item[k] = getRefValue(v, includes);
    }
    yield item;
  }
}

function isPageAttrs(obj: any): obj is PageAttrs {
  return 'slug' in obj;
}

function isPageContent(obj: any): obj is PageContent {
  return 'paragraphs' in obj;
}

function* parseFooterItems(data: EntryCollection<PageAttrs | PageContent>): Generator<FooterItem> {
  if (data.total !== 0) {
    const items = data.items;
    const includes = data.includes;
    const entryItems: Generator<PageParsed | PageContentParsed> = parseEntryItems(items, includes);
    for (let entryItem of entryItems) {
      let footerItem = {
        footerGroup: {
          title: entryItem.footerGroup.title,
          sortWeight: entryItem.footerGroup.sortWeight,
        },
        title: entryItem.footerTitle ?? entryItem.title,
        href: '#',
      };
      if (entryItem.footerGroup && isPageAttrs(entryItem)) {
        footerItem.href = `/${entryItem.slug}`;
      } else if (entryItem.footerGroup && isPageContent(entryItem)) {
        footerItem.href = slug(entryItem.title, entryItem.page.slug);
      }
      yield footerItem;
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
      pageContent.push(item);
    }
  }
  return pageContent;
}

export async function getFooterItems(): Promise<FooterItem[]> {
  let footerItems = [];
  const pageContentData = await contentQuery('pageContent', { 'fields.footerGroup[exists]': true });
  const pageData = await contentQuery('page', { 'fields.footerGroup[exists]': true });
  for (let data of [pageContentData, pageData]) {
    footerItems.push(...parseFooterItems(data));
  }
  return footerItems;
}

export const getBios = async (): Promise<BioEntry> => {
  const { bioListId } = await getGlobalConfig();
  const data: BioEntry = await getEntry(bioListId);
  return data;
};
