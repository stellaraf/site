import * as React from 'react';
import { useEffect, useRef, forwardRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, contentQuery } from '../util';
import { useColorMode, useTheme } from '../context';

export default function Services({ pageData, pageContent }) {
  const sections = pageContent?.items ?? [];
  const { colorMode } = useColorMode();
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const heroRef = useRef();
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
          </Flex>
        </Flex>
      </Box>
      {sectionRefs.map((ref, i) => {
        return (
          <Section
            ref={ref}
            items={sections[i]}
            referenceItems={content.includes}
            index={i % variants.length}
            key={i}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  let geoData = {};
  let geoPoints = {};
  let pageData = {};
  let pageContent = {};
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
