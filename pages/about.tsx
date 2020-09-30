import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, getBios } from 'site/util';
import { Avatars, Hero, GoogleMap, SEO } from 'site/components';
import { useRender, useRef, useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { GetStaticProps } from 'next';
import type { IAboutPage, BioEntry, Bio, ISection } from 'site/types';

const SLUG = 'about';

/**
 * Extract relevant fields from Contentful response.
 */
function* parseBios(raw: BioEntry): Generator<Bio> {
  for (let b of raw.fields.bios) {
    const { photo, ...rest } = b.fields;
    yield { ...rest, photo: photo.fields.file };
  }
}

const Section = (props: ISection) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {title}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

export default function About(props: IAboutPage) {
  const { pageData, bios } = props;
  const { title, subtitle, body, customProperties } = pageData;
  const { employeesTitle = '', mapTitle = '' } = customProperties;
  const headerRef = useRef<HTMLDivElement>();
  const parsedBios = [...parseBios(bios)];
  const renderedBody = useRender(body);
  const titleMe = useTitle();

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero ref={headerRef} title={title} subtitle={subtitle} body={renderedBody} />
      <Section title={titleMe(employeesTitle)}>
        <Avatars bios={parsedBios} />
      </Section>
      <Section title={titleMe(mapTitle)}>
        <GoogleMap />
      </Section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageData = Object();
  let pageContent = Array();
  let bios = Object();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
    bios = await getBios();
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent, bios } };
};
