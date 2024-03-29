import { useMemo } from "react";

import { useRouter } from "next/router";

import { is } from "~/lib";

import type { DocsPage } from "~/queries";

interface UseDocsHrefReturn {
  href: string;
  isCurrent: boolean;
}

export function useDocsHref(props: Omit<DocsPage, "body">): UseDocsHrefReturn {
  const { docsGroup, slug } = props;
  const { asPath } = useRouter();

  return useMemo(() => {
    const thisSlug = asPath.split("/").slice(-1)[0];
    const isCurrent = thisSlug === slug;

    let href = `/docs/${slug}`;
    if (is(docsGroup)) {
      href = `/docs/${docsGroup.slug}/${slug}`;
    }
    return { href, isCurrent };
  }, [asPath, slug]);
}
