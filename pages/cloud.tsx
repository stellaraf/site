import * as React from 'react';
import { useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, getGeoPoints } from 'site/util';
import { useColorValue, useTheme } from 'site/context';
import { Button, ContentSection, SEO } from 'site/components';
import { USMap } from 'site/components/USMap';
import { useActiveSection, useRender } from 'site/hooks';
import { useGradient } from 'site/styles';

import type { CloudProps, GetStaticProps } from 'site/types';

const SLUG = 'cloud';

export default function Cloud({ geoData, geoPoints, pageData, pageContent }: CloudProps) {
  const { colors } = useTheme();
  const gradient = useGradient();
  const mapColor = useColorValue(colors.blackAlpha[200], colors.whiteAlpha[200]);
  const markerColor = useColorValue(colors.primary[400], colors.green[400]);
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => useRef());

  const { title, subtitle, body } = pageData;
  const renderedBody = useRender(body);

  useActiveSection(sectionRefs);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Box ref={useRef()} w="100%" minH="80vh" background={gradient} px={24} pt={32}>
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
            <Heading as="h3" mt={8} fontSize="lg" fontWeight="normal" maxW={[null, null, '75%']}>
              {renderedBody}
            </Heading>
            <Flex justifyContent="center" w="100%" flexWrap="wrap" mt={8}>
              <Button href="#" variant="heroPrimary">
                Find Your Edge Data Center
              </Button>
              <Button href="#" variant="heroSecondary">
                Learn More
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <USMap
          maxW="75%"
          geoData={geoData}
          locations={geoPoints}
          mapColor={mapColor}
          markerColor={markerColor}
        />
      </Box>
      {sectionRefs.map((ref, i) => {
        return <ContentSection ref={ref} items={sections[i]} index={i} key={i} />;
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let geoData = Object();
  let geoPoints = Array();
  let pageData = Object();
  let pageContent = Array();
  try {
    const geoRes = await fetch('https://us-map-geo-points.stellar.workers.dev');
    geoData = await geoRes.json();
    geoPoints = await getGeoPoints();
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { geoData, geoPoints, pageData, pageContent } };
};
