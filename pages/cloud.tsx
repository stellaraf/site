import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, getGeoPoints } from 'site/util';
import { useColorMode, useTheme } from 'site/context';
import { Button, ContentSection, SEO } from 'site/components';
import { USMap } from 'site/components/USMap';
import { useActiveSection } from 'site/hooks';
import { _headerStyle } from 'site/state/atoms';
import { heroBtn1Variant, gradient, useDefaultVariant, useVariantStyle } from 'site/styles';

import type { GetStaticProps } from 'next';
import type { GeoPoint, PageProps } from 'site/util';

const SLUG = 'cloud';

interface CloudProps extends PageProps {
  geoData: object;
  geoPoints: GeoPoint[];
}

export default function Cloud({ geoData, geoPoints, pageData, pageContent }: CloudProps) {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const mapColor = { dark: colors.whiteAlpha[200], light: colors.blackAlpha[200] };
  const markerColor = { dark: colors.green[400], light: colors.primary[400] };
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const heroRef = useRef();
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => {
    return useRef();
  });

  const { title, subtitle } = pageData;
  const defaultVariant = useDefaultVariant(colorMode);

  useEffect(() => {
    setHeaderStyle(defaultVariant);
  }, [colorMode]);

  useActiveSection(
    headerStyle,
    setHeaderStyle,
    defaultVariant,
    [headerStyle, colorMode],
    sectionRefs.map((ref, i) => {
      const style = useVariantStyle(i, colorMode);
      return [ref, style];
    }),
  );
  return (
    <>
      <SEO title={title} description={subtitle} />
      <Box ref={heroRef} w="100%" minH="80vh" background={gradient[colorMode]} px={24} pt={32}>
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
              Our strategically located data centers allow enterprises to substantially reduce
              latency between end-users and business applications.
            </Heading>
            <Flex justifyContent="center" w="100%" flexWrap="wrap" mt={8}>
              <Button mx={4} href="#" boxShadow="md" variantColor={heroBtn1Variant[colorMode]}>
                Find Your Edge Data Center
              </Button>
              <Button mx={4} href="#" color={defaultVariant.color} boxShadow="md">
                Learn More
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <USMap
          maxW="75%"
          geoData={geoData}
          locations={geoPoints}
          mapColor={mapColor[colorMode]}
          markerColor={markerColor[colorMode]}
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
