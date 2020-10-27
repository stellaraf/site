import { Box, Flex, Button as ChakraButton, Heading, VStack } from '@chakra-ui/core';
import { ImPhone as Phone } from '@meronex/icons/im';
import { getPage, getPageContent, getContent } from 'site/util';
import { Content, Hero, Options, SEO, GetStarted } from 'site/components';
import { useSlug } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { IContactPage, GetStaticProps } from 'site/types';

const SLUG = 'contact';

export default function Contact(props: IContactPage) {
  const { pageData, contactCards, pageContent } = props;
  const cards = contactCards.sort((a, b) => a.sortWeight - b.sortWeight);
  const { title, subtitle, body = null, customProperties, getStarted } = pageData;

  const rStyles = useResponsiveStyle();
  const content = pageContent[0];
  const slug = useSlug(content.title, [content.title]);
  return (
    <>
      <SEO title={customProperties?.metaTitle ?? title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} minH="40vh">
        <Box as="section" py={{ base: 16, lg: 32 }}>
          <Flex height="100%" align="center" direction="column" {...rStyles}>
            <Options cards={cards} />
          </Flex>
        </Box>
      </Hero>
      <Box as="section" overflow="hidden">
        <Flex height="100%" overflow="hidden" align="center" direction="column" {...rStyles}>
          <VStack spacing={4}>
            <Content.Title id={slug}>{content.title}</Content.Title>
            {content.subtitle && <Content.Subtitle>{content.subtitle}</Content.Subtitle>}
          </VStack>

          <VStack spacing={4} my={12}>
            <ChakraButton
              as="a"
              boxSize="3rem"
              href={content.buttonLink}
              rounded="full"
              colorScheme="green">
              <Phone />
            </ChakraButton>
            <Heading as="h4" fontSize="xl" fontWeight="medium">
              {content.buttonText}
            </Heading>
          </VStack>
        </Flex>
      </Box>
      {getStarted && <GetStarted {...getStarted.fields} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageData = Object();
  let pageContent = new Array();
  let contactCards = new Array();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
    contactCards = await getContent('contactCard', { include: 4 });
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent, contactCards } };
};
