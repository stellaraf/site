import NextError from "next/error";
import { useRouter } from "next/router";

import { chakra } from "@chakra-ui/react";

import { ContentLoader, ContentSection, Hero, SEO, Callout, Testimonials } from "~/components";
import { pageQuery } from "~/queries";
import { notNullUndefined } from "~/types";

import type { PageProps } from "~/types";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";

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

const CloudPage: NextPage<PageProps> = props => {
  const { isFallback } = useRouter();
  const { title, subtitle, body, callout, contents } = props;

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

  if (contents.length === 0 || typeof title === "undefined") {
    return <NextError statusCode={400} />;
  }

  return (
    <>
      <SEO title={title} description={subtitle ?? undefined} />
      <Hero title={title} subtitle={subtitle} body={body?.raw} />
      {contents.map((sect, i) => {
        return <ContentSection content={sect} key={sect.title} index={i} />;
      })}
      {notNullUndefined(callout) && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const product = ctx.params?.product ?? "notfound";
  const preview = ctx?.preview ?? false;

  const page = await pageQuery({ slug: `cloud/${product}` });

  return { props: { ...page, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { product: "daas" } }],
  fallback: true,
});

export default CloudPage;
