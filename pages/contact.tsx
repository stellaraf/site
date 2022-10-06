import { Box, Flex, Button as ChakraButton, Heading, VStack } from "@chakra-ui/react";
import { Content, DynamicIcon, Hero, FormCardGroup, SEO, GetStarted } from "~/components";
import { useSlug, useResponsiveStyle } from "~/hooks";
import { getPage, getPageContent, getPageId, getContactCards } from "~/util";

import type { GetStaticProps } from "next";
import type { PageEntry, IContactPage, PageContent } from "~/types";

const Contact = (props: PageEntry<IContactPage>): JSX.Element => {
  const { pageData, contactCards, pageContent } = props;

  const cards = contactCards.sort((a, b) => a.sortWeight - b.sortWeight);
  const { title, subtitle, body = null, customProperties, getStarted } = pageData.fields;

  const rStyles = useResponsiveStyle();
  const content = pageContent[0];
  const slug = useSlug(content.title, [content.title]);

  return (
    <>
      <SEO title={customProperties?.metaTitle ?? title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} minH="40vh">
        <Box as="section" py={{ base: 16, lg: 32 }}>
          <Flex height="100%" align="center" direction="column" {...rStyles}>
            <FormCardGroup cards={cards} />
          </Flex>
        </Box>
      </Hero>
      <Box as="section" overflow="hidden">
        <Flex height="100%" overflow="hidden" align="center" direction="column" {...rStyles}>
          <VStack spacing={4} textAlign="center">
            <Content.Title id={slug}>{content.title}</Content.Title>
            {content.subtitle && <Content.Subtitle>{content.subtitle}</Content.Subtitle>}
          </VStack>
          <VStack spacing={4} my={12}>
            <ChakraButton
              as="a"
              boxSize="3rem"
              href={content.buttonLink}
              rounded="full"
              colorScheme="green"
            >
              <DynamicIcon icon={{ im: "ImPhone" }} />
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
};

export const getStaticProps: GetStaticProps<PageEntry<IContactPage>> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<IContactPage>["pageData"];
  let pageContent = [] as PageContent[];

  const contactCards = await getContactCards(preview);

  try {
    const pageId = await getPageId("contact", preview);
    pageData = await getPage<IContactPage["pageData"]>(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
  } catch (err) {
    console.error(err);
  }

  return { props: { pageData, pageContent, contactCards, preview } };
};

export default Contact;
