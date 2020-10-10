import * as React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { getPage, getPageContent, getContent } from 'site/util';
import { Hero, Options, SEO } from 'site/components';
import { useRender } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { IContactPage, GetStaticProps } from 'site/types';

const SLUG = 'contact';

export default function Contact(props: IContactPage) {
  const { pageData, contactCards, formPlaceholders } = props;
  const cards = contactCards.sort((a, b) => a.sortWeight - b.sortWeight);
  const { title, subtitle, body, customProperties } = pageData;
  const renderedBody = useRender(body);
  const rStyles = useResponsiveStyle();
  return (
    <>
      <SEO title={customProperties?.metaTitle ?? title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={renderedBody} minH="80vh">
        <Box as="section" py={{ base: 16, lg: 32 }}>
          <Flex height="100%" align="center" direction="column" {...rStyles}>
            <Options cards={cards} formPlaceholders={formPlaceholders} />
          </Flex>
        </Box>
      </Hero>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageData = Object();
  let pageContent = new Array();
  let contactCards = new Array();
  let formPlaceholders = Object();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
    contactCards = await getContent('contactCard');
    const placeholders = await getContent('formPlaceholders', { 'fields.name': 'Default' });
    if (placeholders.length !== 0) {
      formPlaceholders = placeholders[0];
    }
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent, contactCards, formPlaceholders } };
};
