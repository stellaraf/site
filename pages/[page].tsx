import { getPage, getPageContent } from 'site/util';
import { ContentSection, Hero, SEO, GetStarted } from 'site/components';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { PageProps } from 'site/types';

type UrlQuery = {
  page: string;
};

export default function DynamicPage(props: PageProps) {
  const { pageData, pageContent } = props;
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  const { title, subtitle, body = null, getStarted } = pageData;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} />
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} index={i} />;
      })}
      {getStarted && <GetStarted {...getStarted.fields} />}
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const page = ctx.params?.page ?? 'notfound';
  const preview = ctx.preview ?? false;
  let pageData = Object();
  let pageContent = Array();

  try {
    pageData = await getPage(page, preview);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { page: 'consulting' } }, { params: { page: 'services' } }],
  fallback: false,
});
