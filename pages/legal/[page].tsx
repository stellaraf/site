import { Box } from '@chakra-ui/core';
import { getPage, getPageContent } from 'site/util';
import { SEO, ContentSection } from 'site/components';
import { useTitle } from 'site/hooks';

import type { GetStaticProps, GetStaticPaths } from 'next';

type UrlQuery = {
  page: string;
};

export default function LegalPage(props: ILegalPage) {
  const { pageData, pageContent } = props;
  const { title, subtitle } = pageData;
  const titleMe = useTitle();

  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  return (
    <>
      <SEO title={titleMe(title)} description={subtitle} />
      <Box minH="10vh" />
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} />;
      })}
    </>
  );
}
export const getStaticProps: GetStaticProps<ILegalPage, UrlQuery> = async ctx => {
  const page = ctx.params?.page ?? '';
  let pageData = Object();
  let pageContent = Array();
  try {
    pageData = await getPage(`legal/${page}`);
    pageContent = await getPageContent(pageData.id);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { page: 'privacy' } }, { params: { page: 'msa' } }],
  fallback: false,
});
