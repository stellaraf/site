import { NextSeo } from "next-seo";
import queryString from "query-string";

import { useLocation } from "~/hooks";

import type { NextSeoProps } from "next-seo";

export const SEO = (props: NextSeoProps) => {
  const { title, description, ...rest } = props;
  const { pathname, origin } = useLocation();

  const useFallback = pathname === "/" || typeof title !== "string";

  const imageUrl = useFallback
    ? `${origin}/api/og/fallback`
    : queryString.stringifyUrl({
        url: `${origin}/api/og/page`,
        query: { title, subtitle: description },
      });

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        url: pathname,
        type: "website",
        images: [{ url: imageUrl, width: 1200, height: 600, alt: title }],
      }}
      {...rest}
    />
  );
};
