import { DefaultSeo } from 'next-seo';
import { useConfig } from 'site/context';

import type { BaseSEOProps } from './types';

export const BaseSEO = (props: BaseSEOProps) => {
  const { siteTitle, twitterHandle, siteDescription, orgName } = useConfig();
  return (
    <DefaultSeo
      title={orgName}
      titleTemplate={`%s | ${siteTitle}`}
      description={siteDescription}
      twitter={{ site: twitterHandle, cardType: 'summary' }}
      openGraph={{
        title: orgName,
        description: siteDescription,
        url: '/',
        type: 'website',
        images: [{ url: '//opengraph.jpg', width: 1200, height: 630, alt: orgName }],
      }}
      {...props}
    />
  );
};
