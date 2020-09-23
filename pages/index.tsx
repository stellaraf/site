import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useConfig, useTheme, useColorValue } from 'site/context';
import { HeroCards, HomeSection, Logo, SEO } from 'site/components';
import { useActiveSection, useGradient, useNavLogo, useRef } from 'site/hooks';
import { getHomePage } from 'site/util/content';

import type { HomeProps, HomeStaticProps, GetStaticProps } from 'site/types';

export default function Home(props: HomeProps) {
  const { pageContent } = props;

  const { siteSlogan, orgName } = useConfig();
  const { colors } = useTheme();
  const logo = useColorValue(colors.original.primary, 'white');
  const heroText = useColorValue('original.primary', 'white');

  const bg = useGradient();

  const sections = pageContent.sections.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => useRef<HTMLDivElement>());
  const logoRef = useRef<HTMLDivElement>();

  useNavLogo(logoRef);
  useActiveSection(sectionRefs);

  return (
    <>
      <SEO title={orgName} titleTemplate="%s" />
      <Box ref={useRef()} w="100%" minH="80vh" color={heroText} px={24} pt={32} zIndex={-2} {...bg}>
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
        return (
          <HomeSection ref={ref} section={sections[i]} index={i % sectionRefs.length} key={i} />
        );
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
