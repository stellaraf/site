import { Box } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { SEO, ContentSection } from "~/components";
import { pageQuery } from "~/queries";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const LegalPage: NextPage<PageProps> = props => {
  const { title, subtitle, contents } = props;
  const fnTitle = useTitleCase();

  return (
    <>
      <SEO title={fnTitle(title)} description={subtitle ? subtitle : undefined} />
      <Box minH="10vh" />
      {contents.map((sect, i) => {
        return <ContentSection index={i} content={sect} key={sect.title} />;
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const slug = ctx.params?.page ?? "";
  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug: `legal/${slug}` });
  return { props: { ...page, preview } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { page: "privacy" } }, { params: { page: "msa" } }],
  fallback: false,
});

export default LegalPage;
