import * as React from 'react';
import { forwardRef, useRef } from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import { getPage, getPageContent, getBios } from 'site/util';
import { Avatars, Hero, SEO } from 'site/components';
import { useActiveSection, useRender } from 'site/hooks';

import type { GetStaticProps } from 'next';
import type { AboutProps, BioSectionProps, BioEntry, Bio } from 'site/types';

const SLUG = 'about';

const parseBios = (raw: BioEntry): Bio[] => {
  let bios = [];
  for (let b of raw.fields.bios) {
    const { photo, ...rest } = b.fields;
    const { url, contentType } = photo.fields.file;
    bios.push({ ...rest, photo: { url, contentType } });
  }
  return bios;
};

const BioSection = forwardRef<HTMLDivElement, BioSectionProps>((props, ref) => {
  const { bios, ...rest } = props;
  const styles = useMultiStyleConfig('SyncedStyles', { variant: 0 });
  return (
    <Box ref={ref} as="section" p={24} overflow="hidden" sx={styles.box} {...rest}>
      <Flex height="100%" px={24} alignItems="center" flexDir="column">
        <Heading as="h3" fontSize="4xl">
          Our Team
        </Heading>
        <Avatars bioList={bios} />
      </Flex>
    </Box>
  );
});

export default function About(props: AboutProps) {
  const { pageData, bios } = props;
  const bioRef = useRef();
  const { title, subtitle, body } = pageData;
  const headerRef = useRef();
  const renderedBody = useRender(body);
  const parsedBios = parseBios(bios);

  useActiveSection([bioRef]);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero ref={headerRef} title={title} subtitle={subtitle} body={renderedBody} />
      <BioSection ref={bioRef} bios={parsedBios} />
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
