import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import type { NextSeoProps } from "next-seo";

export const SEO = (props: NextSeoProps) => {
  const { title, description, ...rest } = props;
  const { pathname } = useRouter();

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title, description, url: pathname }}
      {...rest}
    />
  );
};
