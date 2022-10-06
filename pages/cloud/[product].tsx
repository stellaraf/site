import NextError from "next/error";
import { useRouter } from "next/router";

import { chakra } from "@chakra-ui/react";

import { ContentLoader, ContentSection, Hero, SEO, GetStarted, Testimonials } from "~/components";
import { getPage, getPageContent, getPageId } from "~/util";

import type { GetStaticProps, GetStaticPaths } from "next";
import type { PageWithContent, PageEntry, PageContent } from "~/types";

type UrlQuery = {
  product: string;
};

const Layout = chakra("div", {
  baseStyle: {
    w: "100%",
    d: "flex",
    flexDir: "column",
    alignItems: "center",
    minH: "40vh",
    pt: 32,
  },
});

const CloudPage = (props: PageEntry<PageWithContent>) => {
  const { isFallback } = useRouter();
  const { pageData, pageContent } = props;

  if (isFallback) {
    return (
      <>
        <SEO title="Loading..." />
        <Layout>
          <ContentLoader css={{ "& div.__st-content-body": { maxWidth: "unset" } }} />
        </Layout>
      </>
    );
  }

  if (typeof pageContent === "undefined" || typeof pageData === "undefined") {
    return <NextError statusCode={400} />;
  }

  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const { title, subtitle, body = null, getStarted } = pageData.fields;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} />
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} index={i} />;
      })}
      {getStarted && <GetStarted {...getStarted.fields} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageEntry<PageWithContent>, UrlQuery> = async ctx => {
  const product = ctx.params?.product ?? "notfound";
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<PageWithContent>["pageData"];
  let pageContent = [] as PageContent[];

  try {
    const pageId = await getPageId(`cloud/${product}`, preview);
    pageData = await getPage(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
  } catch (err) {
    console.error(err);
  }

  return { props: { pageData, pageContent, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { product: "daas" } }],
  fallback: true,
});

export default CloudPage;
