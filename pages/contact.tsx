import { Box, Flex, Button as ChakraButton, Heading, VStack } from "@chakra-ui/react";

import { Content, DynamicIcon, Hero, FormCardGroup, SEO, Callout } from "~/components";
import { useSlug, useResponsiveStyle } from "~/hooks";
import { is } from "~/lib";
import { contactFormsQuery, pageQuery } from "~/queries";

import type { GetStaticProps, NextPage } from "next";
import type { ContactPageProps } from "~/types";

const Contact: NextPage<ContactPageProps> = props => {
  const { title, subtitle, body, contents, callout, footerTitle, contactForms } = props;

  const rStyles = useResponsiveStyle();
  const content = contents[0];
  const slug = useSlug(content.title, [content.title]);

  return (
    <>
      <SEO title={footerTitle ?? title} description={subtitle ?? undefined} />
      <Hero title={title} subtitle={subtitle} body={body} minH="40vh">
        <Box as="section" py={{ base: 16, lg: 32 }}>
          <Flex height="100%" align="center" direction="column" {...rStyles}>
            <FormCardGroup contactForms={contactForms} />
          </Flex>
        </Box>
      </Hero>
      <Box as="section" overflow="hidden">
        <Flex height="100%" overflow="hidden" align="center" direction="column" {...rStyles}>
          <VStack spacing={4} textAlign="center">
            <Content.Title id={slug}>{content.title}</Content.Title>
            {content.subtitle && <Content.Subtitle>{content.subtitle}</Content.Subtitle>}
          </VStack>
          {is(content.button) && (
            <VStack spacing={4} my={12}>
              <ChakraButton
                as="a"
                boxSize="3rem"
                href={content.button.link ?? ""}
                rounded="full"
                colorScheme="green"
              >
                <DynamicIcon icon={{ im: "ImPhone" }} />
              </ChakraButton>
              <Heading as="h4" fontSize="xl" fontWeight="medium">
                {content.button.text}
              </Heading>
            </VStack>
          )}
        </Flex>
      </Box>
      {is(callout) && <Callout {...callout} />}
    </>
  );
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async ctx => {
  const preview = ctx?.preview ?? false;

  const contactForms = await contactFormsQuery();
  const page = await pageQuery({ slug: "contact" });

  return { props: { ...page, contactForms, preview } };
};

export default Contact;
