import { Box } from '@chakra-ui/react';
import { getPage, getPageContent } from '~/util';
import { SEO, ContentSection } from '~/components';
import { useTitle } from '~/hooks';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { ILegalPage, PageContent, PageAttrs } from '~/types';

type UrlQuery = {
  page: string;
};

const LegalPage: React.FC<ILegalPage> = (props: ILegalPage) => {
  const { pageData, pageContent } = props;
  const { title, subtitle } = pageData;
  const titleMe = useTitle();

  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  return (
    <>
      <SEO title={titleMe(title)} description={subtitle} />
      <Box minH="10vh" />
      {sections.map((sect, i) => {
        return <ContentSection index={i} items={sect} key={i} />;
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps<ILegalPage, UrlQuery> = async ctx => {
  const page = ctx.params?.page ?? '';
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageAttrs;
  let pageContent = [] as PageContent[];
  try {
    pageData = await getPage(`legal/${page}`, preview);
    pageContent = await getPageContent(pageData.id, preview);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent, preview } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { page: 'privacy' } }, { params: { page: 'msa' } }],
  fallback: false,
});

export default LegalPage;
