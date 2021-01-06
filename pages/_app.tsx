import { useEffect } from 'react';
import Head from 'next/head';
import { BaseSEO } from '~/components';
import { Provider } from '~/context';
import { useMouseTrap, useGoogleAnalytics } from '~/hooks';
import { SiteLayout } from '~/layouts';
import { useKonamiState } from '~/state';
import { getGlobalConfig, getFooterItems, getActions, getDocsGroups } from '~/util';

import type {
  TSite,
  NextApp,
  IActions,
  IDocsGroup,
  FooterItem,
  GlobalConfig,
  GetInitialPropsReturn,
} from '~/types';

const Site: NextApp<TSite> = (props: GetInitialPropsReturn<TSite>) => {
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
        <SiteLayout
          actions={actions}
          footerGroups={footerGroups}
          preview={pageProps?.preview ?? false}
        >
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </>
  );
};

Site.getInitialProps = async () => {
  let globalConfig = {} as GlobalConfig;
  let footerGroups = {} as FooterItem[];
  let actions = [] as IActions[];
  let docsGroups = [] as IDocsGroup[];

  globalConfig = await getGlobalConfig();
  footerGroups = await getFooterItems();
  actions = await getActions();
  docsGroups = await getDocsGroups();

  return { appProps: { globalConfig, footerGroups, actions, docsGroups } };
};

export { getServerSideProps } from '~/context';

export default Site;
