import { useEffect } from 'react';
import Head from 'next/head';
import { BaseSEO } from 'site/components';
import { Provider } from 'site/context';
import { useMouseTrap, useGoogleAnalytics } from 'site/hooks';
import { SiteLayout } from 'site/layouts';
import { useKonamiState } from 'site/state';
import { getGlobalConfig, getFooterItems, getActions, getDocsGroups } from 'site/util';

import type { IDocsGroup } from 'site/types';

const Site = (props: SiteProps) => {
  const { Component, pageProps, appProps, router } = props;
  const { globalConfig, footerGroups, actions, docsGroups } = appProps;

  const { initializeAnalytics, trackPage } = useGoogleAnalytics();

  if (typeof process.env.NEXT_PUBLIC_GANALYTICS === 'string') {
    initializeAnalytics(process.env.NEXT_PUBLIC_GANALYTICS);
  }
  useEffect(() => {
    router.events.on('routeChangeComplete', trackPage);
  }, []);

  const konami = useKonamiState();
  useMouseTrap(
    'up up down down left right left right b a',
    () => {
      konami.set(p => !p);
    },
    'keyup',
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Provider appConfig={globalConfig} docsGroups={docsGroups}>
        <BaseSEO />
        <SiteLayout footerGroups={footerGroups} actions={actions}>
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </>
  );
};

Site.getInitialProps = async () => {
  let globalConfig = Object();
  let footerGroups = Object();
  let actions = new Array();
  let docsGroups = [] as IDocsGroup[];

  globalConfig = await getGlobalConfig();
  footerGroups = await getFooterItems();
  actions = await getActions();
  docsGroups = await getDocsGroups();

  return { appProps: { globalConfig, footerGroups, actions, docsGroups } };
};

export default Site;

export { getServerSideProps } from 'site/context';
