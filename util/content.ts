import { createClient } from 'contentful';
import type { EntryCollection, ContentTypeLink, RichTextContent } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

interface ContentRef {
  sys: ContentTypeLink;
}

export interface PageAttrs {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
}

export interface Paragraph {
  title: string;
  body: Document;
}

export interface PageContent {
  page: ContentRef;
  sortWeight: number;
  title: string;
  subtitle?: string;
  body: Document | null;
  paragraphs: Paragraph[];
  button: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface GeoPoint {
  coordinates: { lon: number; lat: number };
  active: boolean;
  displayName: string;
  id: string;
  description: string;
}

export interface PageProps {
  pageData: PageAttrs;
  pageContent: PageContent[];
}

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
 * Get content for a specific page by its sys.id
 */
export const getPageContent = async (pageId: string): Promise<PageContent[]> => {
  let pageContent = [];
  const data = await contentQuery('pageContent', {
    'fields.page.sys.id': pageId,
  });

  if (data.total !== 0) {
    const items = data.items;
    const includes = data.includes ?? {};

    const getRefValue = (val: any): any => {
      let item = val ?? null;
      if (item === null || typeof item === 'undefined') {
        return null;
      } else if (item.constructor.name === 'Object') {
        item = Object(val);
        if ('sys' in item && item.sys.type in includes) {
          for (let ref of includes[item.sys.type] ?? []) {
            if (ref?.sys?.id === item.sys.id) {
              return { id: item.sys.id, ...ref.fields };
            }
          }
        } else {
          return item;
        }
      } else if (item.constructor.name === 'Array') {
        item = Array.from(val);
        return item.map((i: any) => getRefValue(i));
      } else {
        return item;
      }
    };

    for (let i of items) {
      let item = Object();
      for (let [k, v] of Object.entries(i.fields)) {
        item[k] = getRefValue(v);
      }
      pageContent.push(item);
    }
  }
  return pageContent;
};
