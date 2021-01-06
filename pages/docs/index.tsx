import { useRouter } from 'next/router';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { Groups, SEO } from '~/components';
import { useRender, useScaledText, useTitle } from '~/hooks';
import { DocsLayout } from '~/layouts';
import { getPage } from '~/util';

import type { GetStaticProps } from 'next';
import type { IDocsMain, PageAttrs } from 'site/types';

const TextContent: React.FC<PageAttrs> = (props: PageAttrs) => {
  const { title, subtitle, body = null } = props;
  const titleMe = useTitle();
  const renderedBody = useRender(body);
  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([]);
  return (
    <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
      <Flex textAlign="center" flexDir="column" alignItems="center" ref={containerRef}>
        <Heading
          as="h1"
          fontSize={{ base: shouldResize ? '2xl' : '4xl', lg: '6xl' }}
          fontWeight="light"
          ref={headingRef}
        >
          {titleMe(title)}
        </Heading>
        {subtitle && (
          <Heading as="h2" fontSize={{ base: '1.5rem', lg: '3xl' }} fontWeight="light">
            {titleMe(subtitle)}
          </Heading>
        )}
      </Flex>
      {body && renderedBody}
    </Flex>
  );
};

const Docs: React.FC<IDocsMain> = (props: IDocsMain) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return (
      <DocsLayout>
        <Spinner size="xl" />
      </DocsLayout>
    );
  }
  const { pageData } = props;
  const { title, subtitle } = pageData;
  return (
    <>
      <SEO title={title} description={subtitle} />
      <DocsLayout>
        <TextContent {...pageData} />
        <Groups />
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<IDocsMain> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = Object();
  try {
    pageData = await getPage('docs', preview);
  } catch (err) {
    console.error();
    throw err;
  }
  return { props: { pageData } };
};

export default Docs;
