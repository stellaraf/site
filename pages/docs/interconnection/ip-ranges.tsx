import { SEO, DocsArticle, IPRanges } from '~/components';
import { DocsLayout } from '~/layouts';
import { getContent } from '~/util';

import type { GetStaticProps } from 'next';
import type { IDocsArticle, IDocsArticlePage } from '~/types';

type UrlQuery = {
  slug: string;
  group?: string;
};

const DocsArticlePage: React.FC<IDocsArticlePage> = (props: IDocsArticlePage) => {
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
  let article = {} as IDocsArticle;
  try {
    const res = await getContent<IDocsArticle>('docsArticle', preview, {
      'fields.slug': 'ip-ranges',
      include: 4,
    });
    article = res[0];
  } catch (err) {
    console.error(err);
  }
  return { props: { article } };
};

export default DocsArticlePage;
