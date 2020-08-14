import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GetStaticProps } from 'next';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, PageProps } from '../util';
import { useColorMode } from '../context';
import { ContentSection, SEO } from '../components';
import { useActiveSection } from '../hooks';
import { _headerStyle } from '../state/atoms';
import { headerBg, sect1BtnText, gradient, variants, useSectionStyle } from '../styles';

const SLUG = 'services';

export default function Services({ pageData, pageContent }: PageProps) {
  const { colorMode } = useColorMode();
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const heroRef = useRef();
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => {
    return useRef();
  });
  const { title, subtitle } = pageData;

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
          </Flex>
        </Flex>
      </Box>
      {sectionRefs.map((ref, i) => {
        return <ContentSection ref={ref} items={sections[i]} index={i % variants.length} key={i} />;
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageData = Object();
  let pageContent = Array();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent } };
};
