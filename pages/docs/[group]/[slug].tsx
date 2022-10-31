import { useRouter } from "next/router";

import { SEO, DocsArticle, Error, ContentLoader } from "~/components";
import { DocsLayout } from "~/layouts";
import { docsPageQuery } from "~/queries";

import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { DocsPage as DocsPageProps } from "~/queries";

type UrlQuery = {
  slug: string;
  group?: string;
};

const DocsPage: NextPage<DocsPageProps> = props => {
  const { title, description, body } = props;
  const { isFallback } = useRouter();

  if (!isFallback && !body) {
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
  const slug = ctx.params?.slug ?? "";
  const preview = ctx?.preview ?? false;
  let page = {} as DocsPageProps;
  let notFound = false;
  try {
    page = await docsPageQuery({ slug });
  } catch (err) {
    console.error(err);
    notFound = true;
  }
  return { props: { ...page, preview }, notFound };
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
