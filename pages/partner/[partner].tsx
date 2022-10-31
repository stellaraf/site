import { useRouter } from "next/router";

import { chakra } from "@chakra-ui/react";

import { SEO, ContentLoader } from "~/components";
import { PartnerLayout } from "~/layouts";
import { pageQuery } from "~/queries";

import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  partner: string;
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

const PartnerPage: NextPage<PageProps> = props => {
  const { isFallback } = useRouter();
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

  const { title, subtitle } = props;

  return (
    <>
      <SEO title={title} description={subtitle ?? undefined} />
      <PartnerLayout {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const partner = ctx.params?.partner;
  const preview = ctx?.preview ?? false;
  if (typeof partner === "undefined") {
    throw new Error("No partner specified.");
  }

  const page = await pageQuery({ slug: `partner/${partner}` });

  return { props: { ...page, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { partner: "vmware" } }, { params: { partner: "veeam" } }],
  fallback: true,
});

export default PartnerPage;
