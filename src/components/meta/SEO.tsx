import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import type { ISEO } from "./types";

export const SEO: React.FC<ISEO> = (props: ISEO) => {
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
