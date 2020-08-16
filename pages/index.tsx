import * as React from 'react';
import { forwardRef, useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useConfig, useColorMode, useTheme } from 'site/context';
import { Logo } from 'site/components/Logo';
import { HeroCards } from 'site/components/HeroCard';
import { Button } from 'site/components/Button';
import { SEO } from 'site/components/Meta';
import { useActiveSection, useRender, useNavLogo } from 'site/hooks';
import { gradient, useVariantStyle } from 'site/styles';
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
  const { buttonStyle, linkStyle, ...style } = useVariantStyle(index, colorMode);
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
      {...style}
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
          <Button href={buttonLink} leftIcon="chevron-right" {...buttonStyle}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});

export default function Home({ pageContent }: HomeProps) {
  const { colorMode } = useColorMode();
  const { siteSlogan, orgName } = useConfig();
  const { colors } = useTheme();
  const logo = { dark: 'white', light: colors.original.primary };
  const sections = pageContent.sections.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => useRef());
  const logoRef = useRef();

  useNavLogo(logoRef);

  useActiveSection(sectionRefs);

  return (
    <>
      <SEO title={orgName} titleTemplate="%s" />
      <Box
        ref={useRef()}
        w="100%"
        minH="80vh"
        background={gradient[colorMode]}
        color={heroText[colorMode]}
        px={24}
        pt={32}
        zIndex={-2}>
        <Flex flexDir="column" alignItems="center">
          <Box overflowY="hidden">
            <Logo.Typographic color={logo[colorMode]} width={512} ref={logoRef} />
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

export const getStaticProps: GetStaticProps = async (): Promise<HomeStaticProps> => {
  let pageContent = Object();
  try {
    pageContent = await getHomePage();
  } catch (err) {
    console.error(err);
  }
  return { props: { pageContent } };
};
