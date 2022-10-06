import { useMemo } from "react";

import { useRouter } from "next/router";

import type { IDocsArticle } from "~/types";

interface UseDocsHrefReturn {
  href: string;
  isCurrent: boolean;
}

export function useDocsHref(props: IDocsArticle): UseDocsHrefReturn {
  const { docsGroup, slug } = props;
  const { asPath } = useRouter();

  return useMemo(() => {
    const thisSlug = asPath.split("/").slice(-1)[0];
    const isCurrent = thisSlug === slug;

    let href = `/docs/${slug}`;
    if (typeof docsGroup !== "undefined") {
      href = `/docs/${docsGroup.fields.slug}/${slug}`;
    }
    return { href, isCurrent };
  }, [asPath, slug]);
}
