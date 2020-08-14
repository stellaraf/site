import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Flex, Heading, Text } from '@chakra-ui/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useConfig, useColorMode, useTheme } from '../context';
import { VMware } from '../components/Icons';
import { Logo } from '../components/Logo';
import { Br, Button } from '../components';
import { useActiveSection } from '../hooks';
import { showHeaderLogo, _headerStyle } from '../state/atoms';

const headerBg = { dark: 'transparent', light: 'original.light' };
const heroText = { dark: 'white', light: 'original.primary' };
const cardBg = { dark: 'whiteAlpha.100', light: 'white' };
const cardColor = { dark: 'white', light: 'original.dark' };
const sect1Bg = { dark: 'original.dark', light: 'original.light' };
const sect1Text = { dark: 'original.light', light: 'original.dark' };
const sect1BtnText = { dark: 'original.light', light: 'original.dark' };
const sect2Bg = { dark: 'original.dark', light: 'original.tertiary' };
const sect2Text = { dark: 'original.light', light: 'original.dark' };
const sect3Bg = { dark: 'original.dark', light: 'original.primary' };
const sect3Text = { dark: 'original.light', light: 'original.light' };
const sectBorder = {
  dark: { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
  light: {},
};
const gradientLight = { backgroundColor: 'original.light' };

const gradientDark = {
  background: 'rgb(22, 19, 24)',
  background:
    'linear-gradient(180deg, rgba(43, 60, 143, 1) 0%, rgba(42, 23, 74, 1) 50%, rgba(22, 19, 24, 1) 100%)',
};

const gradient = { dark: gradientDark, light: gradientLight };

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

const Home = () => {
  const { colorMode } = useColorMode();
  const { siteSlogan } = useConfig();
  const { colors } = useTheme();
  const logo = { dark: 'white', light: colors.original.primary };
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const [headerLogo, setHeaderLogo] = useRecoilState(showHeaderLogo);
  const logoRef = useRef();
  const heroRef = useRef();
  const sect1Ref = useRef();
  const sect2Ref = useRef();
  const sect3Ref = useRef();

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
    [
      [sect1Ref, { bg: sect1Bg[colorMode], color: sect1Text[colorMode] }],
      [sect2Ref, { bg: sect2Bg[colorMode], color: sect2Text[colorMode] }],
      [sect3Ref, { bg: sect3Bg[colorMode], color: sect3Text[colorMode] }],
    ],
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
            <Card />
          </Flex>
        </Flex>
      </Box>
      <Box
        ref={sect1Ref}
        as="section"
        pt="320px"
        pb={24}
        overflow="hidden"
        bg={sect1Bg[colorMode]}
        color={sect1Text[colorMode]}
        {...sectBorder[colorMode]}>
        <Flex h="100%" overflow="hidden" px={24} py={16} alignItems="center" flexDir="column">
          <Heading as="h3" fontSize="4xl">
            Orion
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            The Enterprise Native Cloud Platform
          </Heading>
          <Text
            my={16}
            maxW={[null, null, '60%']}
            whiteSpace="pre-line"
            fontSize="lg"
            textAlign="justify">
            We're not just knowledgeable about cloud technologies, we've actually built our own
            cloud. Enterprises need tight control over their technology, so we decided to built the
            most customizable cloud platform on the planet. Powered by{' '}
            <VMware height={14} mx={1} display="inline" />, the Orion platform fits right in the
            enterprise ecosystem.
          </Text>
          <Button
            href="/cloud"
            leftIcon="chevron-right"
            color={sect1BtnText[colorMode]}
            variant={colorMode === 'light' ? 'outline' : 'solid'}
            borderColor={colorMode === 'light' ? 'black' : undefined}
            _hover={{
              backgroundColor: colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.500',
            }}>
            Gravitate to Orion
          </Button>
        </Flex>
      </Box>
      <Box ref={sect2Ref} as="section" py={24} overflow="hidden" bg={sect2Bg[colorMode]}>
        <Flex
          h="100%"
          overflow="hidden"
          px={24}
          py={16}
          alignItems="center"
          flexDir="column"
          color={sect2Text[colorMode]}
          {...sectBorder[colorMode]}>
          <Heading as="h3" fontSize="4xl">
            Dedicated Services
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            Your 24/7 Technology Team
          </Heading>
          <Text
            my={16}
            maxW={[null, null, '60%']}
            whiteSpace="pre-line"
            fontSize="lg"
            textAlign="justify">
            As a skilled team of engineers who have supported businesses and technologies of all
            types for decades at a global scale, we're experts at meeting the demands of operating
            business technology. <Br />
            With our bespoke, dedicated IT services, your business is able to offload IT burdens
            based on its specific needs — be it end user IT support, infrastructure management,
            system monitoring, or the entire IT environment.
          </Text>
          <Button
            href="/services"
            leftIcon="chevron-right"
            variant={colorMode === 'light' ? 'outline' : 'solid'}
            borderColor={colorMode === 'light' ? 'black' : undefined}
            color={colorMode === 'light' ? 'black' : 'white'}
            _hover={{
              backgroundColor: 'whiteAlpha.500',
            }}>
            Upgrade your IT Team
          </Button>
        </Flex>
      </Box>
      <Box
        ref={sect3Ref}
        as="section"
        py={24}
        overflow="hidden"
        bg={sect3Bg[colorMode]}
        {...sectBorder[colorMode]}>
        <Flex
          h="100%"
          overflow="hidden"
          px={24}
          py={16}
          alignItems="center"
          flexDir="column"
          color={sect3Text[colorMode]}>
          <Heading as="h3" fontSize="4xl">
            Infrastructure Consulting
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            On-Demand IT Special Forces
          </Heading>
          <Text
            my={16}
            maxW={[null, null, '60%']}
            whiteSpace="pre-line"
            fontSize="lg"
            textAlign="justify">
            Many organizations have business requirements that demand the use of complex IT
            technologies, but not all of them can afford to keep engineers with the necessary
            skillsets on staff at all times.
            <Br /> That's where we come in — our ridiculously talented infrastructure engineers are
            dangerously good at designing, building, and implementing complex IT systems when the
            need arises.
          </Text>
          <Button
            href="/consulting"
            leftIcon="chevron-right"
            variant={colorMode === 'light' ? 'outline' : 'solid'}
            color="white"
            _hover={{
              backgroundColor: colorMode === 'light' ? 'whiteAlpha.300' : 'whiteAlpha.500',
            }}>
            Call in the Experts
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
