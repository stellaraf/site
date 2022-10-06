import { client, getParsedContent } from "./common";

import type { Entry } from "contentful";
import type { PageAttrs, PageContent, PageContentEntry, TFormModelTrial } from "~/types";

export async function getPageId(slug: string, preview: boolean): Promise<string> {
  let pageId = null;
  try {
    const data = await client(preview).getEntries({
      content_type: "page",
      select: "sys.id",
      "fields.slug": slug,
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
export async function getPage<T extends PageAttrs>(pageId: string, preview: boolean): Promise<Entry<T>> {
  // Only get the sys id to cut out noise.
  const data = await client(preview).getEntry<T>(pageId, {
    select: "fields,sys.id",
  });

  return data;
}

/**
 * Get content for a specific page by its sys.id
 */
export async function getPageContent(pageId: string, preview: boolean = false): Promise<PageContent[]> {
  // const data = await getContentType<PageContent>('pageContent', preview, {
  //   'fields.page.sys.id': pageId,
  // });
  // const parsed = await client(preview).parseEntries<PageContent>(data);
  // return parsed.items.map(i => i.fields);
  const data = await getParsedContent<PageContentEntry>("pageContent", preview, {
    "fields.page.sys.id": pageId,
  });
  const parsed = data.map(content => {
    const { form: formEntry, ...contentEntry } = content;
    let form = null;
    if (typeof formEntry !== "undefined") {
      form = {} as TFormModelTrial;
      for (const [k, v] of Object.entries<unknown>(formEntry.fields)) {
        if (typeof v === "string") {
          // @ts-expect-error The model is such that each k:v pair could be string:string,
          // or string:Entry. Typescript will complain about `v` being unknown, and won't
          // accept any other type, even with extensive type guards. Therefore, while this is
          // wrong, we _know_ the structure of `formEntry.fields` can only be one of these two
          // types, therefore this is safe-ish.
          form[k] = v;
        } else {
          // @ts-expect-error Same as above. If `v` is not a string, then it must be an Entry.
          form[k] = v.fields;
        }
      }
    }
    return { form, ...contentEntry };
  }) as PageContent[];

  return parsed;
}
