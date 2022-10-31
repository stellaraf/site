import App from "next/app";
import Head from "next/head";

import { SEOBase, Favicons } from "~/components";
import { Provider } from "~/context";
import { usePageTracking } from "~/hooks";
import { SiteLayout } from "~/layouts";
import {
  configQuery,
  themeQuery,
  docsGroupsQuery,
  footerGroupsQuery,
  actionsQuery,
} from "~/queries";

import type { SiteProps, NextApp, GetInitialPropsReturn } from "~/types";

const Site: NextApp<SiteProps> = (props: GetInitialPropsReturn<SiteProps>) => {
  const { Component, pageProps, appProps } = props;
  const { config, theme, footerGroups, actions, docsGroups } = appProps;

  usePageTracking();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Provider config={config} theme={theme} docsGroups={docsGroups}>
        <SEOBase />
        <Favicons />
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

Site.getInitialProps = async ctx => {
  try {
    const config = await configQuery();
    const docsGroups = await docsGroupsQuery();
    const theme = await themeQuery();
    const footerGroups = await footerGroupsQuery();
    const actions = await actionsQuery();

    const defaultProps = await App.getInitialProps(ctx);

    return {
      ...defaultProps,
      appProps: {
        theme,
        config,
        footerGroups,
        actions,
        docsGroups,
      },
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      throw new Error(`Error while loading app configuration: ${err.message}`);
    }
    throw err;
  }
};

export { getServerSideProps } from "~/context";

export default Site;
