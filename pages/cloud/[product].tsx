import { ContentSection, Hero, SEO, GetStarted } from '~/components';
import { getPage, getPageContent, getPageId } from '~/util';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { PageWithContent, PageEntry, PageContent } from '~/types';

type UrlQuery = {
  product: string;
};

const CloudPage: React.FC<PageEntry<PageWithContent>> = (props: PageEntry<PageWithContent>) => {
  const { pageData, pageContent } = props;
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  const { title, subtitle, body = null, getStarted } = pageData.fields;

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

export const getStaticProps: GetStaticProps<PageEntry<PageWithContent>, UrlQuery> = async ctx => {
  const product = ctx.params?.product ?? 'notfound';
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<PageWithContent>['pageData'];
  let pageContent = [] as PageContent[];

  try {
    const pageId = await getPageId(`cloud/${product}`, preview);
    pageData = await getPage(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
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
