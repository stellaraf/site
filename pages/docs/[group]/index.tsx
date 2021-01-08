import { useRouter } from 'next/router';
import { Flex, Heading } from '@chakra-ui/react';
import { ContentLoader, Error, SEO } from '~/components';
import { useTitle, useRender, useScaledText } from '~/hooks';
import { DocsLayout } from '~/layouts';
import { getDocsGroups } from '~/util';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IDocsGroup, IDocsGroupMain } from '~/types';

type UrlQuery = {
  group: string;
};

const Content: React.FC<IDocsGroup> = (props: IDocsGroup) => {
  const { title, subtitle, summary } = props;
  const titleMe = useTitle();
  const body = useRender(summary);

  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([title]);
  return (
    <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
      <Flex textAlign="center" flexDir="column" alignItems="center" ref={containerRef}>
        <Heading
          as="h1"
          fontSize={{ base: shouldResize ? '3xl' : '4xl', lg: '6xl' }}
          fontWeight="light"
          ref={headingRef}
        >
          {titleMe(title)}
        </Heading>
        {subtitle && (
          <Heading
            as="h2"
            fontWeight="light"
            fontSize={{ base: '1.5rem', lg: 'xl' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            {titleMe(subtitle)}
          </Heading>
        )}
      </Flex>
      {summary && body}
    </Flex>
  );
};

const DocsGroupMain: React.FC<IDocsGroupMain> = (props: IDocsGroupMain) => {
  const { pageData } = props;
  const { isFallback } = useRouter();

  if (!isFallback && !pageData) {
    return (
      <>
        <SEO title="Error" noindex nofollow />
        <DocsLayout>
          <Error />
        </DocsLayout>
      </>
    );
  }

  const { title, subtitle } = props.pageData ?? {};

  return (
    <>
      <SEO title={title} description={subtitle} />
      <DocsLayout>{!isFallback ? <Content {...pageData} /> : <ContentLoader />}</DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IDocsGroupMain, UrlQuery> = async ctx => {
  const group = ctx.params?.group ?? '';
  const preview = ctx?.preview ?? false;
  let pageData = {} as IDocsGroupMain['pageData'];
  let docsGroups = [] as IDocsGroup[];
  let notFound = false;

  try {
    docsGroups = await getDocsGroups(preview);
    pageData = docsGroups.reduce((prev, next) => (prev.slug === group ? prev : next));
  } catch (err) {
    console.error(err);
    notFound = true;
  }
  return { props: { pageData, notFound, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { group: 'interconnection' } }, { params: { group: 'orion' } }],
  fallback: true,
});

export default DocsGroupMain;
