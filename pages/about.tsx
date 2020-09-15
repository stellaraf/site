import * as React from 'react';
import { forwardRef, useRef } from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import { getPage, getPageContent, getBios } from 'site/util';
import { Avatars, SEO } from 'site/components';
import { useActiveSection, useRender } from 'site/hooks';
import { useGradient } from 'site/styles';

import type { GetStaticProps } from 'next';
import type { PageProps, Bio, BioEntry } from 'site/util';

const SLUG = 'about';

interface AboutProps extends PageProps {
  bios: BioEntry;
}

interface BioSectionProps {
  bios: Bio[];
  [k: string]: any;
}

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

export default function About({ pageData, bios }: AboutProps) {
  const bioRef = useRef();
  const { title, subtitle, body } = pageData;
  const renderedBody = useRender(body);
  const parsedBios = parseBios(bios);

  useActiveSection([bioRef]);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Box ref={useRef()} w="100%" minH="40vh" background={useGradient()} px={24} pt={32}>
        <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
          <Flex textAlign="center" flexDir="column" alignItems="center">
            <Heading as="h1" fontSize="6xl" fontWeight="light">
              {title}
            </Heading>
            {subtitle && (
              <Heading as="h2" fontSize="3xl" fontWeight="light">
                {subtitle}
              </Heading>
            )}
            <Box mt={8} fontSize="lg" fontWeight="normal" maxW={[null, null, '75%']}>
              {renderedBody}
            </Box>
          </Flex>
        </Flex>
      </Box>
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
