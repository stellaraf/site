import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";
import queryString from "query-string";
import { useTitleCase } from "use-title-case";

import { Favicons } from "~/components";
import { Provider } from "~/context";
import { usePageTracking } from "~/hooks";
import { SiteLayout } from "~/layouts";
import { originFromEnv } from "~/lib";

import type { PageProps } from "~/types";

const noIndexNoFollow = process.env.VERCEL_ENV !== "production";

const ORIGIN = originFromEnv(process.env);

const Site = (props: AppProps<PageProps>) => {
  const {
    Component,
    pageProps,
    router: { pathname },
  } = props;
  const { common, title: pageTitle, subtitle, footerTitle } = pageProps;
  const { config, theme, footerGroups, actions, docsGroups, twitterHandle } = common;
  const { organizationName, title, description } = config;

  const useFallback = pathname === "/" || typeof title !== "string";

  const imageUrl = useFallback
    ? new URL("/api/og/fallback", ORIGIN)
    : new URL(
        queryString.stringifyUrl({
          url: new URL("/api/og/page", ORIGIN).toString(),
          query: { title, subtitle: description },
        }),
      );

  const siteUrl = new URL(pathname, ORIGIN);

  const fnTitle = useTitleCase();

  usePageTracking();

  return (
    <Provider theme={theme} config={config} docsGroups={docsGroups}>
      <DefaultSeo
        titleTemplate={`%s | ${title}`}
        description={subtitle ?? description}
        dangerouslySetAllPagesToNoIndex={noIndexNoFollow}
        dangerouslySetAllPagesToNoFollow={noIndexNoFollow}
        twitter={{ site: twitterHandle, cardType: "summary" }}
        title={fnTitle(footerTitle ?? pageTitle ?? organizationName)}
        additionalMetaTags={[{ name: "viewport", content: "width=device-width" }]}
        openGraph={{
          title,
          description,
          type: "website",
          url: siteUrl.toString(),
          images: [{ url: imageUrl.toString(), width: 1200, height: 630, alt: title }],
        }}
      />
      <Favicons
        light={theme.colors.primary}
        dark={theme.colors.secondary}
        organizationName={organizationName}
      />
      <SiteLayout
        actions={actions}
        footerGroups={footerGroups}
        preview={pageProps?.preview ?? false}
      >
        <Component {...pageProps} />
      </SiteLayout>
    </Provider>
  );
};

export default Site;
