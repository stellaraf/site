import { useMemo } from "react";

const SCHEME_PATTERN = /(https?|mailto):\/{0,2}.+/;

export interface UseLinkType {
  isExternal: boolean;
  target: string;
}

export function useLinkType(href: string): UseLinkType {
  return useMemo(() => {
    let target = href;
    let isExternal = false;
    if (href[0] === "/") {
      target = href.substring(1);
    }

    if (SCHEME_PATTERN.test(target)) {
      isExternal = true;
      return { isExternal, target };
    }
    const prefix = target.startsWith("#") ? "" : "/";
    target = [prefix, target].join("");

    return { isExternal, target };
  }, [href]);
}
