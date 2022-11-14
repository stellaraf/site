import App from "next/app";
import type { AppContext, AppProps, AppInitialProps } from "next/app";

import { DefaultSeo } from "next-seo";
import queryString from "query-string";
import { useTitleCase } from "use-title-case";

import { Favicons } from "~/components";
import { Provider } from "~/context";
import { usePageTracking } from "~/hooks";
import { SiteLayout } from "~/layouts";
import { serializeUrl } from "~/lib";

import type { PageProps } from "~/types";

interface SiteProps extends AppProps<PageProps> {
  requestUrl: ReturnType<typeof serializeUrl> | null;
}

const noIndexNoFollow = process.env.VERCEL_ENV !== "production";

const Site = (props: SiteProps) => {
  const { Component, pageProps, requestUrl } = props;
  const { common, title: pageTitle, subtitle, footerTitle } = pageProps;
  const { config, theme, footerGroups, actions, docsGroups, twitterHandle } = common;
  const { organizationName, title, description } = config;

  const { origin = "", pathname = "", href = "" } = requestUrl ?? {};
  const useFallback = pathname === "/" || typeof title !== "string";

  const imageUrl = useFallback
    ? `${origin}/api/og/fallback`
    : queryString.stringifyUrl({
        url: `${origin}/api/og/page`,
        query: { title, subtitle: description },
      });

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
          url: href,
          description,
          type: "website",
          images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
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

Site.getInitialProps = async (appCtx: AppContext) => {
  const initialProps: AppInitialProps<PageProps> = await App.getInitialProps(appCtx);
  const referrerHeader = appCtx.ctx.req?.headers.referer ?? "";
  try {
    const requestUrl = serializeUrl(new URL(referrerHeader));
    return { requestUrl, ...initialProps };
  } catch (error) {
    console.group("Failed to parse referrer URL");
    console.error(error);
    console.groupEnd();
  }
  return { requestUrl: null, ...initialProps };
};

export default Site;
