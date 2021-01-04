import { DefaultSeo } from 'next-seo';
import { useConfig } from '~/context';

import type { IBaseSEO } from './types';

export const BaseSEO: React.FC<IBaseSEO> = (props: IBaseSEO) => {
  const { siteTitle, twitterHandle, siteDescription, orgName } = useConfig();
  return (
    <DefaultSeo
      title={orgName}
      description={siteDescription}
      titleTemplate={`%s | ${siteTitle}`}
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
