import type { AppProps, AppType } from "next/app";
import Head from "next/head";

import { SEOBase, Favicons } from "~/components";
import { Provider, type ColorModeContext } from "~/context";
import { usePageTracking } from "~/hooks";
import { SiteLayout } from "~/layouts";

import type { GetServerSideProps } from "next";
import type { PageProps } from "~/types";

const Site: AppType<PageProps> = (props: AppProps<PageProps>) => {
  const { Component, pageProps } = props;
  const { config, theme, footerGroups, actions, docsGroups } = pageProps.common;

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

export const getServerSideProps: GetServerSideProps<ColorModeContext> = async ctx => {
  return {
    props: {
      // First time users will not have any cookies, so an empty string is required.
      cookies: ctx.req.headers.cookie ?? "",
    },
  };
};

export default Site;
