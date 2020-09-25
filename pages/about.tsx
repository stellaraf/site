import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import { getPage, getPageContent, getBios } from 'site/util';
import { Avatars, Hero, GoogleMap, SEO } from 'site/components';
import { useActiveSection, useRender, useRef, useTitle } from 'site/hooks';

import type { GetStaticProps } from 'next';
import type { IAboutPage, IBioSection, BioEntry, Bio, IMapSection } from 'site/types';

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

const BioSection = forwardRef<HTMLDivElement, IBioSection>((props, ref) => {
  const { bios, title, ...rest } = props;
  const styles = useMultiStyleConfig('SyncedStyles', { variant: 0 });
  return (
    <Box ref={ref} as="section" p={24} overflow="hidden" sx={styles.box} {...rest}>
      <Flex height="100%" px={24} alignItems="center" flexDir="column">
        <Heading as="h3" fontSize="4xl">
          {title}
        </Heading>
        <Avatars bioList={bios} />
      </Flex>
    </Box>
  );
});

const MapSection = forwardRef<HTMLDivElement, IMapSection>((props, ref) => {
  const { title, ...rest } = props;
  const styles = useMultiStyleConfig('SyncedStyles', { variant: 1 });
  return (
    <Box ref={ref} as="section" p={24} overflow="hidden" sx={styles.box} {...rest}>
      <Flex height="100%" alignItems="center" flexDir="column">
        <Heading as="h3" mb={12} fontSize="4xl">
          {title}
        </Heading>
        <GoogleMap />
      </Flex>
    </Box>
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

  useActiveSection([bioRef, mapsRef]);

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
