import { useRouter } from 'next/router';
import { SEO, DocsArticle, Error, ContentLoader } from '~/components';
import { DocsLayout } from '~/layouts';
import { getParsedContent } from '~/util';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IDocsArticlePage } from '~/types';

type UrlQuery = {
  slug: string;
  group?: string;
};

const DocsArticlePage: React.FC<IDocsArticlePage> = (props: IDocsArticlePage) => {
  const { article } = props;
  const { isFallback } = useRouter();

  if (!isFallback && !article) {
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

  const { title, description } = article ?? {};
  return (
    <>
      <SEO title={title} description={description} />
      <DocsLayout>
        <DocsArticle {...article} />
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IDocsArticlePage, UrlQuery> = async ctx => {
  const slug = ctx.params?.slug ?? '';
  const preview = ctx?.preview ?? false;
  let article = {} as IDocsArticlePage['article'];
  let notFound = false;
  try {
    const res = await getParsedContent<IDocsArticlePage['article']>('docsArticle', preview, {
      'fields.slug': slug,
    });
    article = res[0];
  } catch (err) {
    console.error(err);
    notFound = true;
  }
  return { props: { article, preview }, notFound };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [
    { params: { slug: 'peering-policy', group: 'interconnection' } },
    { params: { slug: 'routing-policy', group: 'interconnection' } },
    { params: { slug: 'bgp-communities', group: 'interconnection' } },
  ],
  fallback: true,
});

export default DocsArticlePage;
