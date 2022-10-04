import { createClient } from 'contentful';
import { merge } from 'merge-anything';

import type { CreateClientParams, ContentfulClientApi, EntryCollection, Entry } from 'contentful';

export function client(preview: boolean = false): ContentfulClientApi {
  const options = {
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE ?? '',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
  } as CreateClientParams;

  if (preview) {
    options.host = 'preview.contentful.com';
    options.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN ?? '';
  }

  return createClient(options);
}

/**
 * Query Contentful for a specific content_type
 */
export async function getContentType<T>(
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

/**
 * Query Contentful for a specific content_type
 */
export async function getParsedContent<T extends Empty>(
  contentType: string,
  preview: boolean = false,
  query: Dict = {},
): Promise<T[]> {
  const queryParams = merge(
    { content_type: contentType, include: 4, select: 'sys.id,sys.updatedAt,fields' },
    query,
  );

  try {
    const thisClient = client(preview);
    const entries = await thisClient.getEntries<T>(queryParams);
    const parsed = await thisClient.parseEntries<T>(entries);
    return parsed.items.map(item => ({
      ...item.fields,
      updatedAt: item.sys.updatedAt ?? null,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Get an entry by its ID.
 */
export async function getEntry<T>(entryId: string, query: Dict = {}): Promise<Entry<T>> {
  return await client().getEntry<T>(entryId, query);
}
