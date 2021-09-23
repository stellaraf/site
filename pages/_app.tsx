import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
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
} from '~/util';

import type { TSite, NextApp, GetInitialPropsReturn } from '~/types';

const Site: NextApp<TSite> = (props: GetInitialPropsReturn<TSite>) => {
  const { Component, pageProps, appProps, router } = props;
  const { globalConfig, footerGroups, actions, testimonials, docsGroups } = appProps;

  const [queryClient] = useState(() => new QueryClient());

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
      <Provider appConfig={globalConfig} docsGroups={docsGroups} testimonials={testimonials}>
        <BaseSEO />
        <SiteLayout
          actions={actions}
          footerGroups={footerGroups}
          preview={pageProps?.preview ?? false}
        >
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
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

    return { appProps: { globalConfig, footerGroups, actions, testimonials, docsGroups } };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      console.dir(err);
      throw new Error(`Error while loading app configuration: ${err.message}`);
    } else {
      throw err;
    }
  }
};

export { getServerSideProps } from '~/context';

export default Site;
