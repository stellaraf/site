import * as React from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import { BaseSEO } from 'site/components';
import { Provider } from 'site/context';
import { useMouseTrap, useGoogleAnalytics } from 'site/hooks';
import { SiteLayout } from 'site/layouts';
import { useKonamiState } from 'site/state';
import { getGlobalConfig, getFooterItems } from 'site/util';

import type { SiteProps } from 'site/types';

const Site = (props: SiteProps) => {
  const { Component, pageProps, appProps, router } = props;
  const { globalConfig, footerGroups } = appProps;

  const konami = useKonamiState();
  const { initializeAnalytics, trackPage } = useGoogleAnalytics();

  useMouseTrap(
    'up up down down left right left right b a',
    () => {
      konami.set(p => !p);
    },
    'keyup',
  );

  if (typeof process.env.NEXT_PUBLIC_GANALYTICS === 'string') {
    initializeAnalytics(process.env.NEXT_PUBLIC_GANALYTICS);
  }
  useEffect(() => {
    router.events.on('routeChangeComplete', trackPage);
  }, []);

  // if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  //   const whyDidYouRender = require('@welldone-software/why-did-you-render');
  //   whyDidYouRender(React, { trackAllPureComponents: true });
  // }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Provider appConfig={globalConfig}>
        <BaseSEO />
        <SiteLayout footerGroups={footerGroups}>
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </>
  );
};

Site.getInitialProps = async () => {
  let globalConfig = Object();
  let footerGroups = Object();
  globalConfig = await getGlobalConfig();
  footerGroups = await getFooterItems();
  return { appProps: { globalConfig, footerGroups } };
};

export default Site;
