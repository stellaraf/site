import { getPage, getPageContent } from 'site/util';
import { ContentSection, Hero, SEO } from 'site/components';

import type { PageProps, GetStaticProps, GetStaticPaths } from 'site/types';
import type { GetStaticPropsContext } from 'next';

type UrlQuery = {
  product: string;
};

export default function CloudPage(props: PageProps) {
  const { pageData, pageContent } = props;
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  const { title, subtitle, body = null } = pageData;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} />
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} index={i} />;
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async (
  ctx: GetStaticPropsContext<UrlQuery>,
) => {
  const product = ctx.params?.product ?? 'notfound';
  let pageData = Object();
  let pageContent = Array();
  try {
    pageData = await getPage(`cloud/${product}`);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: false,
});
