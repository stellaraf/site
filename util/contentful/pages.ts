import { client, getContentType } from './common';

import type { Entry } from 'contentful';
import type { PageAttrs, PageContent } from '~/types';

export async function getPageId(slug: string, preview: boolean): Promise<string> {
  let pageId = null;
  try {
    const data = await client(preview).getEntries({
      content_type: 'page',
      select: 'sys.id',
      'fields.slug': slug,
    });
    if (data.items.length !== 0) {
      pageId = data.items[0].sys.id;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
  if (pageId === null) {
    throw new Error(`Unable to find page ID for slug '${slug}'`);
  }
  return pageId;
}

/**
 * Get Page by slug
 */
export async function getPage<T extends PageAttrs>(
  pageId: string,
  preview: boolean,
): Promise<Entry<T>> {
  // Only get the sys id to cut out noise.
  const data = await client(preview).getEntry<T>(pageId, { select: 'fields,sys.id' });

  return data;
}

/**
 * Get content for a specific page by its sys.id
 */
export async function getPageContent(
  pageId: string,
  preview: boolean = false,
): Promise<PageContent[]> {
  const data = await getContentType<PageContent>('pageContent', preview, {
    'fields.page.sys.id': pageId,
  });
  const parsed = await client(preview).parseEntries<PageContent>(data);

  return parsed.items.map(i => i.fields);
}
