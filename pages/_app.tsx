import type { AppProps } from "next/app";

import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";
import queryString from "query-string";
import { useTitleCase } from "use-title-case";

import { Favicons } from "~/components";
import { Provider } from "~/context";
import { SiteLayout } from "~/layouts";

import type { GetServerSidePropsContext } from "next";
import type { PageProps } from "~/types";

const noIndexNoFollow = process.env.VERCEL_ENV !== "production";

interface SiteProps extends PageProps {
  cookies: string | undefined;
}

const Site = (props: AppProps<SiteProps>) => {
  const {
    Component,
    pageProps,
    router: { pathname },
  } = props;
  const { common, title: pageTitle, subtitle, footerTitle, cookies } = pageProps;
  const { config, theme, footerGroups, actions, docsGroups, twitterHandle, origin } = common;
  const { organizationName, title, description } = config;

  const useFallback = pathname === "/" || typeof title !== "string";

  const imageUrl = useFallback
    ? new URL("/api/og/fallback", origin)
    : new URL(
        queryString.stringifyUrl({
          url: new URL("/api/og/page", origin).toString(),
          query: { title: pageTitle, subtitle: subtitle ?? description },
        }),
      );

  const siteUrl = new URL(pathname, origin);

  const fnTitle = useTitleCase();

  return (
    <>
      <Provider theme={theme} config={config} docsGroups={docsGroups} cookies={cookies}>
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
      <Analytics debug={process.env.NODE_ENV === "development"} />
    </>
  );
};

export default Site;

/**
 * @see https://chakra-ui.com/docs/styled-system/color-mode#add-colormodemanager-optional-for-ssr
 */
export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      cookies: ctx.req.headers.cookie ?? "",
    },
  };
}
