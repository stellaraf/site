import * as React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import type { SEOProps } from './types';

export const SEO = (props: SEOProps) => {
  const { title, description, ...rest } = props;
  const { pathname } = useRouter();
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title: title, description: description, url: `/${pathname}` }}
      {...rest}
    />
  );
};
