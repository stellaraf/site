import * as React from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo, DefaultSeoProps, NextSeo, NextSeoProps } from 'next-seo';
import { siteTitle, siteDescription, orgName, social } from '../siteConfig';

const { twitter } = social;

export const BaseSEO = (props: DefaultSeoProps) => {
  return (
    <DefaultSeo
      title={orgName}
      titleTemplate={`%s | ${siteTitle}`}
      description={siteDescription}
      twitter={{ site: twitter.handle, cardType: 'summary' }}
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

export const SEO = ({ title, description, ...props }: NextSeoProps) => {
  const { pathname } = useRouter();
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title: title, description: description, url: `/${pathname}` }}
      {...props}
    />
  );
};
