import { Box } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { SEO, ContentSection } from "~/components";
import { FallbackLayout } from "~/layouts";
import { pageQuery, commonStaticPropsQuery, pageStaticPathsQuery } from "~/queries";

import ErrorPage from "../_error";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const LegalPage: NextPage<PageProps> = props => {
  if (props.error) {
    return (
      <FallbackLayout>
        <ErrorPage error={props.error} />
      </FallbackLayout>
    );
  }
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
  const slug = ctx.params?.page ?? "notfound";

  if (slug === "notfound") {
    return { notFound: true };
  }

  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug: `legal/${slug}` });
  const common = await commonStaticPropsQuery();

  return { props: { ...page, preview, common } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "legal" });
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: false };
};

export default LegalPage;
