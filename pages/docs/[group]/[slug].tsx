import { useRouter } from "next/router";

import { SEO, DocsArticle, Error, ContentLoader } from "~/components";
import { DocsLayout } from "~/layouts";
import {
  docsPageQuery,
  commonStaticPropsQuery,
  docsPageStaticPathsQuery,
  docsGroupStaticPathsQuery,
} from "~/queries";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { DocsPageProps } from "~/types";

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
          <Error />
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
  const preview = ctx?.preview ?? false;

  if (slug === "notfound") {
    return { notFound: true };
  }
  try {
    const page = await docsPageQuery({ slug });
    const common = await commonStaticPropsQuery();
    return { props: { ...page, preview, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const groups = await docsGroupStaticPathsQuery();
  let paths: StaticPaths = [];
  for (const group of groups) {
    const pages = await docsPageStaticPathsQuery({ group });
    for (const slug of pages) {
      paths = [...paths, { params: { group, slug } }];
    }
  }
  return { paths, fallback: false };
};

export default DocsPage;
