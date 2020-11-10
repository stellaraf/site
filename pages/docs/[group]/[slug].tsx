import { useRouter } from 'next/router';
import { SEO, DocsArticle, Error, ContentLoader } from 'site/components';
import { DocsLayout } from 'site/layouts';
import { getContent } from 'site/util';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IDocsArticle } from 'site/types';

export default function DocsArticlePage(props: IDocsArticlePage) {
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
}

type UrlQuery = {
  slug: string;
  group?: string;
};

export const getStaticProps: GetStaticProps<IDocsArticlePage, UrlQuery> = async ctx => {
  const slug = ctx.params?.slug ?? '';
  const preview = ctx.preview ?? false;
  let article = {} as IDocsArticle;
  let notFound = false;
  try {
    const res = await getContent<IDocsArticle>('docsArticle', preview, {
      'fields.slug': slug,
      include: 4,
    });
    article = res[0];
  } catch (err) {
    console.error(err);
    notFound = true;
  }
  return { props: { article }, notFound };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [
    { params: { slug: 'peering-policy', group: 'interconnection' } },
    { params: { slug: 'routing-policy', group: 'interconnection' } },
    { params: { slug: 'bgp-communities', group: 'interconnection' } },
  ],
  fallback: true,
});
