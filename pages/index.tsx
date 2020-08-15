import * as React from 'react';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useConfig, useColorMode, useTheme } from 'site/context';
import { Logo } from 'site/components/Logo';
import { HeroCards } from 'site/components/HeroCard';
import { Button } from 'site/components/Button';
import { SEO } from 'site/components/Meta';
import { useActiveSection, useRender } from 'site/hooks';
import { _headerStyle } from 'site/state/atoms';
import { gradient, headerBg, sect1BtnText, useSectionStyle } from 'site/styles';
import { getHomePage } from 'site/util/content';

import type { HomepageContent, HomeSection, GlobalConfig } from 'site/util/content';
import type { GetStaticProps } from 'next';

interface HomeProps {
  pageContent: HomepageContent;
  globalConfig: GlobalConfig;
}
interface SectionProps {
  section: HomeSection;
  index: number;
  [k: string]: any;
}

interface HomeStaticProps {
  props: { pageContent: HomeProps };
}

type Ref = React.MutableRefObject<HTMLElement>;

const heroText = { dark: 'white', light: 'original.primary' };
const sectBorder = {
  dark: { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
  light: {},
};

const Section = forwardRef(({ section, index, ...props }: SectionProps, ref: Ref) => {
  const { colorMode } = useColorMode();
  const { title, subtitle, body, showButton, buttonText, buttonLink } = section;
  const renderedBody = useRender(body);
  const style = useSectionStyle(index, colorMode);
  const padding = Object();
  if (index === 0) {
    padding.pt = '320px';
    padding.pb = 24;
  } else {
    padding.py = 16;
  }
  return (
    <Box
      ref={ref}
      as="section"
      overflow="hidden"
      bg={style.bg}
      color={style.text}
      {...padding}
      {...sectBorder[colorMode]}
      {...props}>
      <Flex h="100%" overflow="hidden" px={24} py={16} alignItems="center" flexDir="column">
        <Heading as="h3" fontSize="4xl">
          {title}
        </Heading>
        <Heading as="h4" fontSize="xl" fontWeight="light">
          {subtitle}
        </Heading>
        <Box
          my={16}
          maxW={[null, null, '60%']}
          whiteSpace="pre-line"
          fontSize="lg"
          textAlign="justify">
          {renderedBody}
        </Box>
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

export default function Home({ pageContent }: HomeProps) {
  const { colorMode } = useColorMode();
  const { siteSlogan, siteTitle } = useConfig();
  const { colors } = useTheme();
  const logo = { dark: 'white', light: colors.original.primary };
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const logoRef = useRef();

  const heroRef = useRef();
  const sections = pageContent.sections.sort((a, b) => a.sortWeight - b.sortWeight);
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
      const style = useSectionStyle(i, colorMode);
      return [ref, { bg: style.bg, color: style.text }];
    }),
  );
  return useMemo(
    () => (
      <>
        <SEO title={siteTitle} titleTemplate="%s" />
        <Box
          ref={heroRef}
          w="100%"
          minH="80vh"
          background={gradient[colorMode]}
          color={heroText[colorMode]}
          px={24}
          pt={32}
          zIndex={-2}>
          <Flex flexDir="column" alignItems="center">
            <Box ref={logoRef} overflowY="hidden">
              <Logo.Typographic color={logo[colorMode]} width={512} />
            </Box>
            <Flex textAlign="center">
              <Heading as="h1" fontSize="2xl" fontWeight="light" mb={32}>
                {siteSlogan}
              </Heading>
            </Flex>
          </Flex>
          <Flex pos="relative" mt={32} h="160px">
            <Flex justifyContent="center" pos="absolute" w="100%" h="sm">
              <HeroCards content={pageContent.heroCards} />
            </Flex>
          </Flex>
        </Box>
        {sectionRefs.map((ref, i) => {
          return <Section ref={ref} section={sections[i]} index={i} key={i} />;
        })}
      </>
    ),
    [headerStyle],
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<HomeStaticProps> => {
  let pageContent = Object();
  try {
    pageContent = await getHomePage();
  } catch (err) {
    console.error(err);
  }
  return { props: { pageContent } };
};
