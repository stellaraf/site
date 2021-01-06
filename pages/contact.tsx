import dynamic from 'next/dynamic';
import { Box, Flex, Button as ChakraButton, Heading, VStack } from '@chakra-ui/react';
import { getPage, getPageContent, getContent } from '~/util';
import { Content, Hero, Options, SEO, GetStarted } from '~/components';
import { useSlug } from '~/hooks';
import { useResponsiveStyle } from '~/styles';

import type { GetStaticProps } from 'next';
import type { IContactPage, PageContent, IContactCard } from '~/types';

const Phone = dynamic<MeronexIcon>(() => import('@meronex/icons/im').then(i => i.ImPhone));

const Contact: React.FC<IContactPage> = (props: IContactPage) => {
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
};

export const getStaticProps: GetStaticProps<IContactPage> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = {} as IContactPage['pageData'];
  let pageContent = [] as PageContent[];
  let contactCards = [] as IContactCard[];

  try {
    pageData = await getPage('contact', preview);
    pageContent = await getPageContent(pageData?.id ?? null, preview);
    contactCards = await getContent<IContactCard>('contactCard', preview, { include: 4 });
  } catch (err) {
    console.error(err);
  }

  return { props: { pageData, pageContent, contactCards, preview } };
};

export default Contact;
