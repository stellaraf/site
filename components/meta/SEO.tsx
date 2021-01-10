import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import type { NextSeoProps } from 'next-seo';
import type { ISEO } from './types';

export const SEO: React.FC<ISEO> = (props: ISEO) => {
  const { title, description, ...rest } = props;
  const { pathname } = useRouter();

  // Ensure noindex/nofollow are set for preview site.
  let indexFollow = {} as NextSeoProps;
  if (process.env.GITHUB_BRANCH === 'develop') {
    indexFollow = { nofollow: true, noindex: true };
  }

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title, description, url: `/${pathname}` }}
      {...indexFollow}
      {...rest}
    />
  );
};
