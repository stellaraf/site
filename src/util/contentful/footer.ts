import { getParsedContent } from './common';
import { slug, sortByTitle, sortByWeight } from '../generic';

import type {
  PageAttrs,
  FooterItem,
  IDocsGroup,
  PageContent,
  FooterGroupEntry,
  SortedFooterItem,
} from '~/types';

type FooterPageContent = Pick<
  PageContent,
  'title' | 'footerGroup' | 'footerTitle' | 'page' | 'sortWeight'
>;

type FooterPage = Pick<PageAttrs, 'title' | 'footerTitle' | 'footerGroup' | 'slug'>;

type FooterDocsGroup = Pick<
  IDocsGroup,
  'title' | 'footerGroup' | 'footerTitle' | 'sortWeight' | 'slug'
>;

/**
 * Get & parse each instance of the `pageContent` model, extract its attributes & references to
 * form a `FooterItem`.
 */
async function* getPageContentFooterItems(preview: boolean): AsyncGenerator<FooterItem> {
  /**
   * Select only the fields needed to create a FooterItem. Unfortunately, Contentful only supports
   * the select operator with up to 2 levels deep, so we must pull down the entire footerGroup &
   * page referenced items as well.
   */
  const data = await getParsedContent<FooterPageContent>('pageContent', preview, {
    'fields.footerGroup[exists]': true,
    select:
      'sys.id,fields.title,fields.sortWeight,fields.footerTitle,fields.footerGroup,fields.page',
  });

  for (const i of data) {
    // This will always be true because of the `footerGroup[exists]` filter in the query.
    if (typeof i.footerGroup !== 'undefined') {
      const footerGroup = {
        title: i.footerGroup.fields.title,
        sortWeight: i.footerGroup.fields.sortWeight,
      } as FooterItem['footerGroup'];
      // Use the `footerTitle` if it's defined, otherwise just use the section's title.
      const title = i.footerTitle ?? i.title;
      // Create a slug with the section's title & the associated page's slug.
      const href = slug(i.title, i.page.fields.slug);
      // Always sort Page Content under Page (notice the base weight of 10 on the Page).
      const sortWeight = i.sortWeight + 10;
      yield { title, href, sortWeight, footerGroup };
    }
  }
}

/**
 * Get & parse each instance of the `page` model, extract its attributes & references to
 * form a `FooterItem`.
 */
async function* getPageFooterItems(preview: boolean): AsyncGenerator<FooterItem> {
  const data = await getParsedContent<FooterPage>('page', preview, {
    'fields.footerGroup[exists]': true,
    select: 'sys.id,fields.title,fields.footerTitle,fields.footerGroup,fields.slug',
  });
  for (const i of data) {
    // This will always be true because of the `footerGroup[exists]` filter in the query.
    if (typeof i.footerGroup !== 'undefined') {
      const footerGroup = {
        title: i.footerGroup.fields.title,
        sortWeight: i.footerGroup.fields.sortWeight,
      } as FooterItem['footerGroup'];
      // Use the `footerTitle` if it's defined, otherwise just use the page's title.
      const title = i.footerTitle ?? i.title;
      const href = `/${i.slug}`;
      // Sort Pages over Page Content (note the +10 on the Page Content sortWeight).
      const sortWeight = 10;
      yield { title, href, sortWeight, footerGroup };
    }
  }
}

/**
 * Get & parse each instance of the `docsGroup` model, extract its attributes & references to
 * form a `FooterItem`.
 */
async function* getDocsGroupsFooterItems(preview: boolean): AsyncGenerator<FooterItem> {
  const data = await getParsedContent<FooterDocsGroup>('docsGroup', preview, {
    'fields.footerGroup[exists]': true,
    select:
      'sys.id,fields.title,fields.slug,fields.footerTitle,fields.footerGroup,fields.sortWeight',
  });
  for (const i of data) {
    // This will always be true because of the `footerGroup[exists]` filter in the query.
    if (typeof i.footerGroup !== 'undefined') {
      const footerGroup = {
        title: i.footerGroup.fields.title,
        sortWeight: i.footerGroup.fields.sortWeight,
      } as FooterItem['footerGroup'];
      // Use the `footerTitle` if it's defined, otherwise just use the doc group's title.
      const title = i.footerTitle ?? i.title;
      let href = `/docs/${i.slug}`;

      if (i.slug === 'docs') {
        // If we're at the root, just use the base slug.
        href = `/${i.slug}`;
      }

      const sortWeight = 10;
      yield { title, href, sortWeight, footerGroup };
    }
  }
}

/**
 * Get & parse each instance of the `footerGroup` model, extract its attributes & references to
 * form a `FooterItem`.
 */
async function* getFooterGroupItems(preview: boolean): AsyncGenerator<FooterItem> {
  const data = await getParsedContent<FooterGroupEntry>('footerGroup', preview, {
    'fields.externalLinks[exists]': true,
    select: 'sys.id,fields.title,fields.sortWeight,fields.externalLinks',
  });
  for (const i of data) {
    // This will always be true because of the `footerGroup[exists]` filter in the query.
    if (typeof i.externalLinks !== 'undefined') {
      for (const e of i.externalLinks) {
        const footerGroup = {
          title: i.title,
          sortWeight: i.sortWeight,
        } as FooterItem['footerGroup'];
        const title = e.fields.title;
        const href = e.fields.href;
        const sortWeight = e.fields.sortWeight ?? 255;
        yield { title, href, sortWeight, footerGroup };
      }
    }
  }
}

/**
 * Get Pages & Page Content with footerGroups defined, and footerGroups with externalLinks defined,
 * back reference each footer group & its items to build a single array of all footer links.
 *
 * Each footer link contains its parent's title & sortWeight as well as its own title, link, and
 * sortWeight.
 */
export async function getFooterItems(preview: boolean = false): Promise<SortedFooterItem[]> {
  const footerItems = [] as FooterItem[];

  for (const promise of [
    getPageFooterItems(preview),
    getFooterGroupItems(preview),
    getDocsGroupsFooterItems(preview),
    getPageContentFooterItems(preview),
  ]) {
    for await (const item of promise) {
      footerItems.push(item);
    }
  }

  const titleSet = new Set(footerItems.map(i => i.footerGroup.title));

  const sortedTitles = Array.from(titleSet).sort((a, b) => {
    const groupA = footerItems.find(f => f.footerGroup.title === a);
    const groupB = footerItems.find(f => f.footerGroup.title === b);

    if (typeof groupA !== 'undefined' && typeof groupB !== 'undefined') {
      return sortByWeight(groupA.footerGroup, groupB.footerGroup);
    }
    return -1;
  });

  const sortedItems = sortedTitles.reduce<SortedFooterItem[]>((final, title) => {
    const items = footerItems
      .filter(i => i.footerGroup.title === title)
      .sort(sortByTitle)
      .sort(sortByWeight);
    final.push({ title, items });
    return final;
  }, []);

  return sortedItems;
}
