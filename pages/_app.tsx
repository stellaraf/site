import { useEffect } from 'react';
import Head from 'next/head';
import { BaseSEO } from '~/components';
import { Provider } from '~/context';
import { useGoogleAnalytics } from '~/hooks';
import { SiteLayout } from '~/layouts';
import {
  getGlobalConfig,
  getFooterItems,
  getActions,
  getDocsGroups,
  getTestimonials,
  getCalculators,
} from '~/util';

import type { TSite, NextApp, GetInitialPropsReturn } from '~/types';

const Site: NextApp<TSite> = (props: GetInitialPropsReturn<TSite>) => {
  const { Component, pageProps, appProps, router } = props;
  const { globalConfig, footerGroups, actions, testimonials, docsGroups, quote } = appProps;

  const { initializeAnalytics, trackPage } = useGoogleAnalytics();

  if (typeof process.env.NEXT_PUBLIC_GANALYTICS === 'string') {
    initializeAnalytics(process.env.NEXT_PUBLIC_GANALYTICS);
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', trackPage);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Provider
        appConfig={globalConfig}
        docsGroups={docsGroups}
        testimonials={testimonials}
        quote={quote}
      >
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
  try {
    const globalConfig = await getGlobalConfig();
    const footerGroups = await getFooterItems();
    const actions = await getActions();
    const testimonials = await getTestimonials();
    const docsGroups = await getDocsGroups();
    const quote = await getCalculators();

    return { appProps: { globalConfig, footerGroups, actions, testimonials, docsGroups, quote } };
  } catch (err) {
    console.error(err);
    console.dir(err.details?.errors ?? {});
    throw new Error(`Error while loading app configuration: ${err.message}`);
  }
};

export { getServerSideProps } from '~/context';

export default Site;
