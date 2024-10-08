import { DocsArticle, IPRanges, SEO } from "~/components";
import { DocsLayout } from "~/layouts";
import { commonStaticPropsQuery, docsPageQuery } from "~/queries";
import { Stage } from "~/types";

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
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  const page = await docsPageQuery({ slug: "ip-ranges", stage });
  const common = await commonStaticPropsQuery({ stage });
  return { props: { ...page, draft, common } };
};

export default DocsArticlePage;
