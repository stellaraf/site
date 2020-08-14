import * as React from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useConfig, useColorMode, useTheme } from 'site/context';
import { Logo } from 'site/components/Logo';
import { HeroCards } from 'site/components/HeroCard';
import { Button } from 'site/components/Button';
import { useActiveSection, useRender } from 'site/hooks';
import { showHeaderLogo, _headerStyle } from 'site/state/atoms';
import { gradient, headerBg, sect1BtnText, useSectionStyle, variants } from 'site/styles';
import { getHomePage } from 'site/util/content';

import type { HomepageContent, HomeSection } from 'site/util/content';
import type { GetStaticProps } from 'next';

interface HomeProps {
  pageContent: HomepageContent;
}
interface SectionProps {
  section: HomeSection;
  index: number;
  [k: string]: any;
}

type Ref = React.MutableRefObject<HTMLElement>;

const heroText = { dark: 'white', light: 'original.primary' };
const cardBg = { dark: 'whiteAlpha.100', light: 'white' };
const cardColor = { dark: 'white', light: 'original.dark' };
const sectBorder = {
  dark: { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
  light: {},
};

const Card = ({ title = 'Title', content = 'Content', icon, ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      p={8}
      w="6xl"
      h="sm"
      bg={cardBg[colorMode]}
      color={cardColor[colorMode]}
      borderRadius="md"
      boxShadow="2xl"
      {...props}>
      <Flex>
        <Heading as="h2" fontSize="xl">
          {title}
        </Heading>
      </Flex>
      <Flex>
        <Text ml={2}>{content}</Text>
      </Flex>
    </Box>
  );
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
  const { siteSlogan } = useConfig();
  const { colors } = useTheme();
  const logo = { dark: 'white', light: colors.original.primary };
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const [headerLogo, setHeaderLogo] = useRecoilState(showHeaderLogo);
  const logoRef = useRef();

  const heroRef = useRef();
  const sections = pageContent.sections.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => {
    return useRef();
  });

  useEffect(() => {
    setHeaderStyle({ bg: headerBg[colorMode], color: sect1BtnText[colorMode] });
  }, [colorMode]);

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y <= 0) {
        !headerLogo && setHeaderLogo(true);
      } else if (currPos.y > 0) {
        setHeaderLogo(false);
      }
    },
    [],
    logoRef,
  );
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
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageContent = Object();
  try {
    pageContent = await getHomePage();
  } catch (err) {
    console.error(err);
  }
  return { props: { pageContent } };
};
