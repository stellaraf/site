import { useRouter } from "next/router";

import { ContentLoader, DocsArticle, ErrorAlert, SEO } from "~/components";
import { DocsLayout } from "~/layouts";
import {
  commonStaticPropsQuery,
  docsGroupStaticPathsQuery,
  docsPageQuery,
  docsPageStaticPathsQuery,
} from "~/queries";
import { type DocsPageProps, Stage } from "~/types";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

type UrlQuery = {
  slug: string;
  group?: string;
};

type StaticPaths = Awaited<ReturnType<GetStaticPaths<UrlQuery>>>["paths"];

const DocsPage: NextPage<DocsPageProps> = props => {
  const { title, description } = props;
  const { isFallback } = useRouter();

  if (!isFallback && !title) {
    return (
      <>
        <SEO title="Error" noindex nofollow />
        <DocsLayout>
          <ErrorAlert />
        </DocsLayout>
      </>
    );
  }

  if (isFallback) {
    return (
      <DocsLayout>
        <ContentLoader />
      </DocsLayout>
    );
  }

  return (
    <>
      <SEO title={title} description={description} />
      <DocsLayout>
        <DocsArticle {...props} />
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<DocsPageProps, UrlQuery> = async ctx => {
  const slug = ctx.params?.slug ?? "notfound";

  if (slug === "notfound") {
    return { notFound: true };
  }
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  try {
    const page = await docsPageQuery({ slug, stage });
    const common = await commonStaticPropsQuery({ stage });
    return { props: { ...page, draft, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const groups = await docsGroupStaticPathsQuery();
  let paths: StaticPaths = [];
  for (const group of groups) {
    try {
      const pages = await docsPageStaticPathsQuery({ group });
      for (const slug of pages) {
        paths = [...paths, { params: { group, slug } }];
      }
    } catch (error) {
      console.error(error);
    }
  }
  return { paths, fallback: "blocking" };
};

export default DocsPage;
