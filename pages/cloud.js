import * as React from 'react';
import { useEffect, useRef, forwardRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, contentQuery } from '../util';
import { useColorMode, useTheme } from '../context';
import { USMap } from '../components/USMap';
import { Button } from '../components';
import { useActiveSection, usePageContent } from '../hooks';
import { _headerStyle } from '../state/atoms';

const SLUG = 'cloud';

const heroBtn1Variant = { dark: 'light', light: 'primary' };

const headerBg = { dark: 'transparent', light: 'original.light' };
const sect1BtnText = { dark: 'original.light', light: 'original.dark' };

const gradientLight = { backgroundColor: 'original.light' };

const gradientDark = {
  background: 'rgb(22, 19, 24)',
  background:
    'linear-gradient(180deg, rgba(43, 60, 143, 1) 0%, rgba(42, 23, 74, 1) 50%, rgba(22, 19, 24, 1) 100%)',
};

const gradient = { dark: gradientDark, light: gradientLight };

const commonDark = {
  btnBorder: undefined,
  btnVariant: 'solid',
  btnHoverBg: 'whiteAlpha.500',
  border: { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
};

const commonLight = {
  btnVariant: 'outline',
  btnBorder: 'black',
  btnHoverBg: 'blackAlpha.50',
  border: {},
};

const variants = [
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
      otherProps: { pt: '320px' },
    },
    light: {
      bg: 'original.light',
      text: 'original.dark',
      btnText: 'original.dark',
      ...commonLight,
      otherProps: { pt: '320px' },
    },
  },
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
    },
    light: {
      bg: 'original.tertiary',
      text: 'original.dark',
      btnText: 'original.dark',
      ...commonLight,
    },
  },
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
    },
    light: {
      bg: 'original.primary',
      text: 'original.light',
      btnText: 'original.light',
      ...commonLight,
    },
  },
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
    },
    light: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonLight,
    },
  },
];
const useSectionStyle = idx => {
  const { colorMode } = useColorMode();
  return variants[idx][colorMode];
};

const Section = forwardRef(({ items, index, ...props }, ref) => {
  const { title, subtitle, body, showButton, buttonText, buttonLink, subsections } = usePageContent(
    items,
  );
  const style = useSectionStyle(index);

  return (
    <Box
      ref={ref}
      as="section"
      p={24}
      overflow="hidden"
      bg={style.bg}
      color={style.text}
      {...style.border}
      {...props}>
      <Flex h="100%" overflow="hidden" px={24} alignItems="center" flexDir="column">
        {title}
        {subtitle}
        {body}
        {subsections}
        {showButton && (
          <Button
            href={buttonLink}
            leftIcon="chevron-right"
            color={style.btnText}
            variant={style.btnVariant}
            borderColor={style.btnBorder}
            _hover={{
              backgroundColor: style.btnHoverBg,
            }}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});

export default function Cloud({ geoData, geoPoints, pageData, pageContent }) {
  console.log(pageContent);
  const sections = pageContent ?? [];
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const mapColor = { dark: colors.whiteAlpha[200], light: colors.blackAlpha[200] };
  const markerColor = { dark: colors.green[400], light: colors.primary[400] };
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const heroRef = useRef();
  const locations = geoPoints?.items?.map(loc => loc.fields);

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
      const style = useSectionStyle(idx);
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
          locations={locations}
          mapColor={mapColor[colorMode]}
          markerColor={markerColor[colorMode]}
        />
      </Box>
      {sectionRefs.map((ref, i) => {
        return <Section ref={ref} items={sections[i]} index={i % variants.length} key={i} />;
      })}
    </>
  );
}

export async function getStaticProps() {
  let geoData = {};
  let geoPoints = {};
  let pageData = {};
  let pageContent = [];
  try {
    const geoRes = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
    geoData = await geoRes.json();
    geoPoints = await contentQuery('orionLocation');
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { geoData, geoPoints, pageData, pageContent } };
}
