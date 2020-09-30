import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import { getPage, getPageContent, getBios } from 'site/util';
import { Avatars, Hero, GoogleMap, SEO } from 'site/components';
import { useActiveSection, useRender, useRef, useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { GetStaticProps } from 'next';
import type { IAboutPage, IBioSection, BioEntry, Bio, IMapSection, ISection } from 'site/types';

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

const Section = forwardRef<HTMLDivElement, ISection>((props, ref) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  return (
    <Box ref={ref} as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {title}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
});

const BioSection = forwardRef<HTMLDivElement, IBioSection>((props, ref) => {
  const { bios, title, ...rest } = props;
  // const styles = useMultiStyleConfig('SyncedStyles', { variant: 0 });
  return (
    // <Section ref={ref} title={title} sx={styles.box} {...rest}>
    <Section ref={ref} title={title} {...rest}>
      <Avatars bios={bios} />
    </Section>
  );
});

const MapSection = forwardRef<HTMLDivElement, IMapSection>((props, ref) => {
  const { title, ...rest } = props;
  // const styles = useMultiStyleConfig('SyncedStyles', { variant: 1 });
  return (
    // <Section ref={ref} title={title} sx={styles.box} {...rest}>
    <Section ref={ref} title={title} {...rest}>
      <GoogleMap />
    </Section>
  );
});

export default function About(props: IAboutPage) {
  const { pageData, bios } = props;
  const { title, subtitle, body, customProperties } = pageData;
  const { employeesTitle = '', mapTitle = '' } = customProperties;
  const headerRef = useRef<HTMLDivElement>();
  const bioRef = useRef<HTMLDivElement>();
  const mapsRef = useRef<HTMLDivElement>();
  const parsedBios = [...parseBios(bios)];
  const renderedBody = useRender(body);
  const titleMe = useTitle();

  // useActiveSection([bioRef, mapsRef]);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero ref={headerRef} title={title} subtitle={subtitle} body={renderedBody} />
      <BioSection ref={bioRef} bios={parsedBios} title={titleMe(employeesTitle)} />
      <MapSection ref={mapsRef} title={titleMe(mapTitle)} />
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
