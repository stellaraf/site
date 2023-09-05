import type { FooterGroupItem, FooterGroup } from "~/components";
import type { FooterGroups } from "~/queries";

type Pages = ArrayElement<FooterGroups>["pages"];
type PageContents = ArrayElement<FooterGroups>["pageContents"];

function createMapper(prefix: string = ""): (i: FooterGroupItem) => FooterGroupItem {
  return ({ slug, title, footerTitle }: FooterGroupItem) => ({
    slug: `${prefix}${slug}`,
    title: footerTitle ? footerTitle : title,
  });
}

function sortPageItems(pages: Pages, pageContents: PageContents): FooterGroupItem[] {
  const mappedPageContents = pageContents.reduce<FooterGroupItem[]>(
    (final, each): FooterGroupItem[] => {
      const { slug, title, page, footerTitle } = each;
      final.push({ title: footerTitle || title, slug: `${page?.slug}#${slug}` });
      return final;
    },
    [],
  );

  let pageItems: FooterGroupItem[] = [];
  let subPageItems: FooterGroupItem[] = [];
  for (const page of pages.map(createMapper())) {
    if (page.slug.match("/")) {
      subPageItems = [...subPageItems, page];
    } else {
      pageItems = [...pageItems, page];
    }
  }
  // Sort main page links first, followed by hash links, followed by sub-pages.
  return [...pageItems, ...mappedPageContents, ...subPageItems];
}

export function buildFooter(groups: FooterGroups): FooterGroup[][] {
  const processedGroups = groups.reduce<FooterGroup[]>(
    (final, { pages, pageContents, docsGroup, title, row, externalLinks, sortAlphabetically }) => {
      const items: FooterGroupItem[] = [
        ...sortPageItems(pages, pageContents),
        ...docsGroup.map(createMapper("docs/")),
        ...externalLinks.map(({ title, showIcon, href }) => ({
          slug: href,
          title,
          external: true,
          showIcon: showIcon,
        })),
      ];
      final.push({ group: title, items, row, sortAlphabetically });
      return final;
    },
    [],
  );

  const intoRows: FooterGroup[][] = processedGroups.reduce<FooterGroup[][]>((final, group) => {
    if (typeof final[group.row - 1] === "undefined") {
      final[group.row - 1] = [];
    }
    final[group.row - 1] = processedGroups.filter(g => g.row === group.row);
    return final;
  }, []);

  const sorted: FooterGroup[][] = intoRows.map(row =>
    row.map(({ items, sortAlphabetically, ...group }) => {
      if (sortAlphabetically) {
        const sortedItems = items.sort((a, b) => (a.title > b.title ? 1 : -1));
        return { items: sortedItems, sortAlphabetically, ...group };
      }
      return { items, sortAlphabetically, ...group };
    }),
  );

  return sorted;
}
