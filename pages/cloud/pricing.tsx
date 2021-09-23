import NextError from 'next/error';
import { Box, Flex } from '@chakra-ui/react';
import { dehydrate, QueryClient } from 'react-query';
import { ContentSection, Hero, SEO, GetStarted, Testimonials, Quote } from '~/components';
import { useResponsiveStyle, fetchProductPrice } from '~/hooks';
import {
  getPage,
  getPageContent,
  getPageId,
  getCalculators,
  extractQuoteProductCodes,
} from '~/util';

import type { GetStaticProps } from 'next';
import type { BoxProps } from '@chakra-ui/react';
import type {
  PageWithContent,
  PageEntry,
  PageContent,
  QuoteEntry,
  SFHubProduct,
  WithDehydratedState,
} from '~/types';

type UrlQuery = {
  product: string;
};

interface PricingPageProps extends WithDehydratedState<PageEntry<PageWithContent>> {
  quote: QuoteEntry;
}

const Section = (props: BoxProps): JSX.Element => {
  const { children, ...rest } = props;

  const rStyles = useResponsiveStyle();
  return (
    <Box as="section" py={18} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        {children}
      </Flex>
    </Box>
  );
};

const PricingPage = (props: PricingPageProps): JSX.Element => {
  const { pageData, pageContent, quote } = props;

  if (typeof pageContent === 'undefined' || typeof pageData === 'undefined') {
    return <NextError statusCode={400} />;
  }

  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const { title, subtitle, body = null, getStarted } = pageData.fields;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} />
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} index={i} />;
      })}
      <Section>
        <Quote quote={quote} />
      </Section>
      {getStarted && <GetStarted {...getStarted.fields} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PricingPageProps, UrlQuery> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<PageWithContent>['pageData'];
  let pageContent = [] as PageContent[];
  let quote = {} as QuoteEntry;

  const queryClient = new QueryClient();

  try {
    const pageId = await getPageId('cloud/pricing', preview);
    pageData = await getPage(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
    quote = await getCalculators();
    const productCodes = extractQuoteProductCodes(quote);
    await queryClient.prefetchQuery<SFHubProduct[], Error, SFHubProduct[], string[]>({
      queryKey: productCodes,
      queryFn: fetchProductPrice,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  const dehydratedState = dehydrate(queryClient);

  return {
    props: { pageData, pageContent, preview, quote, dehydratedState },
  };
};

export default PricingPage;
