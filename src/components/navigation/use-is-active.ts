import { useMemo } from "react";

import { useRouter } from "next/router";

export function useIsActive(...slugs: string[]): boolean {
  const { asPath } = useRouter();
  return useMemo(() => {
    for (const slug of slugs) {
      if (asPath === "/" && slug === "/") {
        return true;
      } else if (slug !== "/") {
        if (asPath.startsWith(slug)) {
          return true;
        }
      }
    }
    return false;
  }, [slugs.length, asPath]);
}
