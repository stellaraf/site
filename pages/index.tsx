import * as React from 'react';
import { forwardRef, useRef } from 'react';
import { Box, Flex, Heading, useMultiStyleConfig } from '@chakra-ui/core';
import BsChevronRight from '@meronex/icons/bs/BsChevronRight';
import { useConfig, useTheme, useColorValue } from 'site/context';
import { Logo } from 'site/components/Logo';
import { HeroCards } from 'site/components/HeroCard';
import { Button } from 'site/components/Button';
import { SEO } from 'site/components';
import { useActiveSection, useRender, useNavLogo } from 'site/hooks';
import { useGradient } from 'site/styles';
import { getHomePage } from 'site/util/content';

import type { HomeProps, SectionProps, HomeStaticProps, GetStaticProps } from 'site/types';

const Section = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  const { section, index, ...rest } = props;
  const sectBorder = useColorValue(
    {},
    { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
  );
  const { title, subtitle, body, showButton, buttonText, buttonLink } = section;
  const renderedBody = useRender(body);
  const styles = useMultiStyleConfig('SyncedStyles', { variant: index });
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
      sx={styles.box}
      {...padding}
      {...sectBorder}
      {...rest}>
      <Flex height="100%" overflow="hidden" px={24} py={16} alignItems="center" flexDir="column">
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
          <Button href={buttonLink} leftIcon={<BsChevronRight />} sx={styles.button}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});

export default function Home(props: HomeProps) {
  const { pageContent } = props;
  const { siteSlogan, orgName } = useConfig();
  const { colors } = useTheme();
  const logo = useColorValue(colors.original.primary, 'white');
  const heroText = useColorValue('original.primary', 'white');
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
        background={useGradient()}
        color={heroText}
        px={24}
        pt={32}
        zIndex={-2}>
        <Flex flexDir="column" alignItems="center">
          <Box overflowY="hidden">
            <Logo.Text color={logo} width={512} ref={logoRef} />
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
