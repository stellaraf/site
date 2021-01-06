import { getPage, getPageContent } from '~/util';
import { ContentSection, Hero, SEO, GetStarted } from '~/components';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { PageAttrs, PageProps, PageContent } from '~/types';

type UrlQuery = {
  product: string;
};

const CloudPage: React.FC<PageProps> = (props: PageProps) => {
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
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const product = ctx.params?.product ?? 'notfound';
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageAttrs;
  let pageContent = [] as PageContent[];
  try {
    pageData = await getPage(`cloud/${product}`, preview);
    pageContent = await getPageContent(pageData?.id ?? null, preview);
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [],
  fallback: false,
});

export default CloudPage;
