import type { AppProps } from "next/app";
import { Open_Sans, Fira_Code } from "next/font/google";

import { Worker } from "@react-pdf-viewer/core";
import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import queryString from "query-string";
import { useTitleCase } from "use-title-case";

import { Favicons } from "~/components";
import { Provider } from "~/context";
import { SiteLayout } from "~/layouts";

import type { GetServerSidePropsContext } from "next";
import type { PageProps } from "~/types";

interface SiteProps extends PageProps {
  cookies: string | undefined;
  description?: string;
}

interface RootSEOProps
  extends Omit<DefaultSeoProps, "title" | "description">,
    Pick<SiteProps, "footerTitle" | "subtitle">,
    Pick<PageProps["common"], "twitterHandle">,
    Pick<PageProps["common"]["config"], "organizationName" | "description" | "title"> {
  imageUrl: URL;
  siteUrl: URL;
  pageTitle: string;
}

const noIndexNoFollow = process.env.VERCEL_ENV !== "production";

const openSans = Open_Sans({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
});

// Separate component so useTitleCase doesn't render outside of context.
const RootSEO = (props: RootSEOProps) => {
  const {
    title,
    siteUrl,
    imageUrl,
    subtitle,
    pageTitle,
    description,
    footerTitle,
    twitterHandle,
    organizationName,
    ...rest
  } = props;
  const fnTitle = useTitleCase();
  return (
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
      {...rest}
    />
  );
};

const Site = (props: AppProps<SiteProps>) => {
  const {
    Component,
    pageProps,
    router: { asPath },
  } = props;

  const { common, title: pageTitle, subtitle, footerTitle, cookies, draft } = pageProps;
  const { config, theme, footers, actions, docsGroups, twitterHandle, origin, menus } = common;
  const { organizationName, title, description } = config;

  const useFallback = asPath === "/" || typeof title !== "string";

  const imageUrl = useFallback
    ? new URL("/api/og/fallback", origin)
    : new URL(
        queryString.stringifyUrl({
          url: new URL("/api/og/page", origin).toString(),
          query: { title: pageTitle, subtitle: subtitle ?? pageProps.description ?? description },
        }),
      );

  const siteUrl = new URL(asPath, origin);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-open-sans: ${openSans.style.fontFamily};
            --font-fira-code: ${firaCode.style.fontFamily};
          }
        `}
      </style>
      <Provider
        draft={draft}
        theme={theme}
        config={config}
        cookies={cookies}
        docsGroups={docsGroups}
      >
        <RootSEO
          title={title}
          siteUrl={siteUrl}
          imageUrl={imageUrl}
          subtitle={subtitle}
          pageTitle={pageTitle}
          description={description}
          footerTitle={footerTitle}
          twitterHandle={twitterHandle}
          organizationName={organizationName}
        />

        <Favicons
          light={theme.colors.light}
          dark={theme.colors.primary}
          organizationName={organizationName}
        />
        <SiteLayout actions={actions} footers={footers} menus={menus}>
          <Worker workerUrl="/assets/pdf.worker.js">
            <Component {...pageProps} />
          </Worker>
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
