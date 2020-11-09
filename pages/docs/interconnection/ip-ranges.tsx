import { SEO, DocsArticle, IPRanges } from 'site/components';
import { DocsLayout } from 'site/layouts';
import { getContent } from 'site/util';

import type { GetStaticProps } from 'next';
import type { IDocsArticle } from 'site/types';

export default function DocsArticlePage(props: IDocsArticlePage) {
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
}

type UrlQuery = {
  slug: string;
  group?: string;
};

export const getStaticProps: GetStaticProps<IDocsArticlePage, UrlQuery> = async () => {
  let article = {} as IDocsArticle;
  try {
    const res = await getContent<IDocsArticle>('docsArticle', {
      'fields.slug': 'ip-ranges',
      include: 4,
    });
    article = res[0];
  } catch (err) {
    console.error(err);
  }
  return { props: { article } };
};
