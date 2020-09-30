import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useConfig, useTheme, useColorValue } from 'site/context';
import { HeroCards, HomeSection, Logo, SEO } from 'site/components';
import { useGradient, useNavLogo, useRef } from 'site/hooks';
import { getHomePage } from 'site/util/content';
import { useResponsiveStyle } from 'site/styles';

import type { HomeProps, HomeStaticProps, GetStaticProps } from 'site/types';

export default function Home(props: HomeProps) {
  const { pageContent } = props;

  const { siteSlogan, orgName } = useConfig();
  const { colors } = useTheme();
  const logo = useColorValue(colors.original.primary, 'white');
  const heroText = useColorValue('original.primary', 'white');
  const rStyles = useResponsiveStyle();

  const bg = useGradient();

  const sections = pageContent.sections.sort((a, b) => a.sortWeight - b.sortWeight);
  const logoRef = useRef<HTMLDivElement>();

  useNavLogo(logoRef);

  return (
    <>
      <SEO title={orgName} titleTemplate="%s" />
      <Box w="100%" minH="80vh" color={heroText} pt={32} zIndex={-2} {...rStyles} {...bg}>
        <Flex flexDir="column" alignItems="center">
          <Box overflowY="hidden" width={['90%', '66%', '33%']}>
            <Logo.Text color={logo} ref={logoRef} />
          </Box>
          <Flex textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: '1.5rem', md: 'xl', lg: '2xl' }}
              fontWeight="light"
              mb={32}>
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
      {sections.map((sect, i) => {
        return <HomeSection section={sect} index={i % sections.length} key={i} />;
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
