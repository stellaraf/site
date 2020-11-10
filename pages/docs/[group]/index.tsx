import { useRouter } from 'next/router';
import { Flex, Heading } from '@chakra-ui/core';
import { ContentLoader, Error, SEO } from 'site/components';
import { useTitle, useRender, useScaledText } from 'site/hooks';
import { DocsLayout } from 'site/layouts';
import { getDocsGroups } from 'site/util';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IDocsGroup } from 'site/types';

const Content = (props: IDocsGroup) => {
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
          ref={headingRef}>
          {titleMe(title)}
        </Heading>
        {subtitle && (
          <Heading
            as="h2"
            fontWeight="light"
            fontSize={{ base: '1.5rem', lg: 'xl' }}
            textAlign={{ base: 'center', lg: 'left' }}>
            {titleMe(subtitle)}
          </Heading>
        )}
      </Flex>
      {summary && body}
    </Flex>
  );
};

export default function DocsGroupMain(props: IDocsGroupMain) {
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
}

type UrlQuery = {
  group: string;
};

export const getStaticProps: GetStaticProps<IDocsGroupMain, UrlQuery> = async ctx => {
  const group = ctx.params?.group ?? '';
  const preview = ctx?.preview ?? false;
  let pageData = {} as IDocsGroup;
  let docsGroups = [];
  let notFound = false;
  try {
    docsGroups = await getDocsGroups();
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
