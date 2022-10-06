import type { GetStaticProps } from "next";

import { SEO, DocsArticle, IPRanges } from "~/components";
import { DocsLayout } from "~/layouts";
import { getParsedContent } from "~/util";

import type { IDocsArticlePage } from "~/types";

type UrlQuery = {
  slug: string;
  group?: string;
};

const DocsArticlePage = (props: IDocsArticlePage) => {
  const { title, description } = props.article;
  return (
    <>
      <SEO title={title} description={description} />
      <DocsLayout>
        <DocsArticle {...props.article}>
          <IPRanges />
        </DocsArticle>
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IDocsArticlePage, UrlQuery> = async ctx => {
  const preview = ctx?.preview ?? false;
  let article = {} as IDocsArticlePage["article"];
  try {
    const res = await getParsedContent<IDocsArticlePage["article"]>("docsArticle", preview, {
      "fields.slug": "ip-ranges",
    });
    article = res[0];
  } catch (err) {
    console.error(err);
  }
  return { props: { article, preview } };
};

export default DocsArticlePage;
