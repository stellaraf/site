import { SEO, DocsArticle, IPRanges } from "~/components";
import { DocsLayout } from "~/layouts";
import { docsPageQuery, commonStaticPropsQuery } from "~/queries";

import type { GetStaticProps } from "next";
import type { DocsPage } from "~/queries";

type UrlQuery = {
  slug: string;
  group?: string;
};

const DocsArticlePage = (props: DocsPage) => {
  const { title, description } = props;
  return (
    <>
      <SEO title={title} description={description} />
      <DocsLayout>
        <DocsArticle {...props}>
          <IPRanges />
        </DocsArticle>
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<DocsPage, UrlQuery> = async ctx => {
  const preview = ctx?.preview ?? false;
  const page = await docsPageQuery({ slug: "ip-ranges" });
  const common = await commonStaticPropsQuery();
  return { props: { ...page, preview, common } };
};

export default DocsArticlePage;
