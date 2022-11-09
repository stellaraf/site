import { useRouter } from "next/router";

import { SEO, DocsArticle, Error, ContentLoader } from "~/components";
import { DocsLayout } from "~/layouts";
import { docsPageQuery } from "~/queries";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { DocsPageProps } from "~/types";

type UrlQuery = {
  slug: string;
  group?: string;
};

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
    return { props: { ...page, preview } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [
    { params: { slug: "peering-policy", group: "interconnection" } },
    { params: { slug: "routing-policy", group: "interconnection" } },
    { params: { slug: "bgp-communities", group: "interconnection" } },
  ],
  fallback: true,
});

export default DocsPage;
