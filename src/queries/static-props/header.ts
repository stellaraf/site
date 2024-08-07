import { is } from "~/lib";

import type { MenuProps, MenuSection } from "~/components";
import type { HeaderGroups } from "../";

export function buildHeaders(headerGroups: HeaderGroups): MenuProps[] {
  return headerGroups.reduce<MenuProps[]>((final, group) => {
    if (is(group.link)) {
      final = [
        ...final,
        { title: group.title, href: group.link, sections: [], columns: group.columns },
      ];
    } else {
      let sections = [] as MenuSection[];
      const externalLinks = group.externalLinks.map(ext => ({
        title: ext.title,
        description: null,
        icon: null,
        showIcon: ext.showIcon,
        href: ext.href,
      }));
      if (group.pagesOnly) {
        let items = group.pages.map(page => ({
          title: page.footerTitle ?? page.title,
          description: null,
          href: `/${page.slug}`,
          icon: null,
        }));
        items = [...items, ...externalLinks];
        if (group.sortAlphabetically) {
          items = items.sort((a, b) => (a.title > b.title ? 1 : -1));
        }
        sections = [...sections, { title: "", menuTitle: group.title, items }];
      } else {
        for (const page of group.pages) {
          const contents = page.contents.filter(content => !content.hideFromHeader);
          let items = contents.map(content => ({
            title: content.footerTitle ?? content.title,
            description: content.subtitle ?? null,
            icon: content.callToAction.icon ?? null,
            href: `/${page.slug}#${content.slug}`,
          }));
          items = [...items, ...externalLinks];
          const section: MenuSection = {
            title: page.footerTitle ?? page.title,
            subtitle: page.subtitle ?? null,
            href: `/${page.slug}`,
            items,
            menuTitle: group.title,
          };
          sections = [...sections, section];
        }
      }
      final = [
        ...final,
        { title: group.title, href: `/${group.pages[0].slug}`, sections, columns: group.columns },
      ];
    }
    return final;
  }, []);
}
