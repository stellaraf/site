import * as React from 'react';
import { GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, getGeoPoints, GeoPoint, PageAttrs, PageContent } from '../util';
import { useColorMode, useTheme } from '../context';
import { USMap } from '../components/USMap';
import { Button, ContentSection } from '../components';
import { useActiveSection } from '../hooks';
import { _headerStyle } from '../state/atoms';
import {
  heroBtn1Variant,
  headerBg,
  sect1BtnText,
  gradient,
  variants,
  useSectionStyle,
} from '../styles';

const SLUG = 'cloud';

interface PageProps {
  geoData: object;
  geoPoints: GeoPoint[];
  pageData: PageAttrs;
  pageContent: PageContent[];
}

export default function Cloud({ geoData, geoPoints, pageData, pageContent }: PageProps) {
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

  useEffect(() => {
    setHeaderStyle({ bg: headerBg[colorMode], color: sect1BtnText[colorMode] });
  }, [colorMode]);

  useActiveSection(
    headerStyle,
    setHeaderStyle,
    { bg: headerBg[colorMode], color: sect1BtnText[colorMode] },
    [headerStyle, colorMode],
    sectionRefs.map((ref, i) => {
      const idx = i % variants.length;
      const style = useSectionStyle(idx, colorMode);
      return [ref, { bg: style.bg, color: style.text }];
    }),
  );
  return (
    <>
      <Box ref={heroRef} w="100%" minH="80vh" background={gradient[colorMode]} px={24} pt={32}>
        <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
          <Flex textAlign="center" flexDir="column" alignItems="center">
            <Heading as="h1" fontSize="6xl" fontWeight="light">
              {pageData.title}
            </Heading>
            {pageData.subtitle && (
              <Heading as="h2" fontSize="3xl" fontWeight="light">
                {pageData.subtitle}
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
              <Button mx={4} href="#" color={sect1BtnText[colorMode]} boxShadow="md">
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
        return <ContentSection ref={ref} items={sections[i]} index={i % variants.length} key={i} />;
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
    const geoRes = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
    geoData = await geoRes.json();
    geoPoints = await getGeoPoints();
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { geoData, geoPoints, pageData, pageContent } };
};
