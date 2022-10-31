import { useMemo } from "react";

import type { FooterGroups } from "~/queries";

type FooterGroupItem = {
  slug: string;
  title: string;
  footerTitle?: string | null | undefined;
  [k: string]: unknown;
};

type FooterGroup = {
  group: string;
  row: number;
  items: FooterGroupItem[];
};

const mapper = ({ slug, title, footerTitle }: FooterGroupItem) => ({
  slug,
  title: footerTitle ? footerTitle : title,
});

export function useFooterLinks(groups: FooterGroups): FooterGroup[][] {
  return useMemo(() => {
    const processedGroups = groups.reduce<FooterGroup[]>(
      (final, { pages, pageContents, docsGroup, title, row }) => {
        const items = [
          ...pages.map(mapper),
          ...pageContents.reduce<FooterGroupItem[]>((final, each): FooterGroupItem[] => {
            const { slug, title, page, footerTitle } = each;
            final.push({ title: footerTitle ? footerTitle : title, slug: `${page?.slug}#${slug}` });
            return final;
          }, []),
          ...docsGroup.map(mapper),
        ];
        final.push({ group: title, items, row });
        return final;
      },
      [],
    );

    const intoRows = processedGroups.reduce<FooterGroup[][]>((final, group) => {
      if (typeof final[group.row - 1] === "undefined") {
        final[group.row - 1] = [];
      }
      final[group.row - 1] = processedGroups.filter(g => g.row === group.row);
      return final;
    }, []);
    return intoRows;
  }, [groups]);
}
