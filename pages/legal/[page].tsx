import { Box } from "@chakra-ui/react";

import { ContentSection } from "~/components";
import { FallbackLayout } from "~/layouts";
import { pageQuery, commonStaticPropsQuery, pageStaticPathsQuery } from "~/queries";
import { Stage, type PageProps } from "~/types";

import ErrorPage from "../_error";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

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
  const { contents } = props;

  return (
    <>
      <Box minH="10vh" />
      {contents.map((sect, i) => {
        return (
          <ContentSection
            index={i}
            content={sect}
            key={sect.title}
            sx={{ "& .__st-content-body": { textAlign: "left", maxW: "100%" } }}
          />
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const slug = ctx.params?.page ?? "notfound";

  if (slug === "notfound") {
    return { notFound: true };
  }

  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  const page = await pageQuery({ slug: `legal/${slug}`, stage });
  const common = await commonStaticPropsQuery({ stage });

  return { props: { ...page, draft, common } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "legal" });
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: "blocking" };
};

export default LegalPage;
