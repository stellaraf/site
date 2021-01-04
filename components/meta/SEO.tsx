import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import type { ISEO } from './types';

export const SEO: React.FC<ISEO> = (props: ISEO) => {
  const { title, description, ...rest } = props;
  const { pathname } = useRouter();
  return (
    <NextSeo
      noindex
      nofollow
      title={title}
      description={description}
      openGraph={{ title: title, description: description, url: `/${pathname}` }}
      {...rest}
    />
  );
};
