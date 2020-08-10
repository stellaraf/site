import * as React from 'react';
import { useRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/core';
import { useColorMode, useTheme } from '../context';
import { USMap } from '../components/USMap';
import { VMware } from '../components/Icons';
import { Link } from '../components/Link';
import { Br, Button } from '../components';
import { useActiveSection, usePageContent } from '../hooks';
import { _headerStyle } from '../state/atoms';

const heroBtn1Variant = { dark: 'light', light: 'primary' };

const headerBg = { dark: 'transparent', light: 'original.light' };
const sect1Bg = { dark: 'original.dark', light: 'original.light' };
const sect1Text = { dark: 'original.light', light: 'original.dark' };
const sect1BtnText = { dark: 'original.light', light: 'original.dark' };
const sect2Bg = { dark: 'original.dark', light: 'original.tertiary' };
const sect2Text = { dark: 'original.light', light: 'original.dark' };
const sect3Bg = { dark: 'original.dark', light: 'original.primary' };
const sect3Text = { dark: 'original.light', light: 'original.light' };
const sect4Bg = { dark: 'original.dark', light: 'original.secondary' };
const sect4Text = { dark: 'original.light', light: 'original.light' };
const sect5Bg = { dark: 'original.dark', light: 'original.dark' };
const sect5Text = { dark: 'original.light', light: 'original.light' };
const sectBorder = {
  dark: { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
  light: {},
};

const fetcher = async url => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

const gradientLight = { backgroundColor: 'original.light' };

const gradientDark = {
  background: 'rgb(22, 19, 24)',
  background:
    'linear-gradient(180deg, rgba(43, 60, 143, 1) 0%, rgba(42, 23, 74, 1) 50%, rgba(22, 19, 24, 1) 100%)',
};

const gradient = { dark: gradientDark, light: gradientLight };

const Cloud = ({ contentUrl, content, geoData }) => {
  const testElem = usePageContent(content.items[0]);
  console.log(testElem);
  const { data: locationsRaw, error } = useSWR(contentUrl + '&content_type=orionLocation', fetcher);
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const mapColor = { dark: colors.whiteAlpha[200], light: colors.blackAlpha[200] };
  const markerColor = { dark: colors.green[400], light: colors.primary[400] };
  const [headerStyle, setHeaderStyle] = useRecoilState(_headerStyle);
  const heroRef = useRef();
  const sect1Ref = useRef();
  const sect2Ref = useRef();
  const sect3Ref = useRef();
  const sect4Ref = useRef();
  const sect5Ref = useRef();
  error && console.error(error);
  const locations = locationsRaw?.items?.map(loc => loc.fields);

  useEffect(() => {
    setHeaderStyle({ bg: headerBg[colorMode], color: sect1BtnText[colorMode] });
  }, [colorMode]);

  useActiveSection(
    headerStyle,
    setHeaderStyle,
    { bg: headerBg[colorMode], color: sect1BtnText[colorMode] },
    [headerStyle, colorMode],
    [
      [sect1Ref, { bg: sect1Bg[colorMode], color: sect1Text[colorMode] }],
      [sect2Ref, { bg: sect2Bg[colorMode], color: sect2Text[colorMode] }],
      [sect3Ref, { bg: sect3Bg[colorMode], color: sect3Text[colorMode] }],
      [sect4Ref, { bg: sect4Bg[colorMode], color: sect4Text[colorMode] }],
      [sect5Ref, { bg: sect5Bg[colorMode], color: sect5Text[colorMode] }],
    ],
  );
  return (
    <>
      <Box ref={heroRef} w="100%" minH="80vh" background={gradient[colorMode]} px={24} pt={32}>
        <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
          <Flex textAlign="center" flexDir="column" alignItems="center">
            <Heading as="h1" fontSize="6xl" fontWeight="light">
              Orion
            </Heading>
            <Heading as="h2" fontSize="3xl" fontWeight="light">
              The Enterprise Native Cloud
            </Heading>
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
          {/* <Heading as="h3" fontSize="4xl">
            100% Uptime Guarantee
          </Heading> */}
          {testElem.title}
          <Heading as="h4" fontSize="xl" fontWeight="light">
            Time is money & talk is cheap
          </Heading>
          <Text
            my={16}
            maxW={[null, null, '60%']}
            whiteSpace="pre-line"
            fontSize="lg"
            textAlign="justify">
            We're <em>that</em> confident in the Orion platform. If we fail to deliver on our
            Service Level Agreement, we'll credit back the amount of time services were unavailable.
          </Text>
          <Button
            href="https://info.stellar.tech/docs/resources/sla"
            leftIcon="chevron-right"
            color={sect1BtnText[colorMode]}
            variant={colorMode === 'light' ? 'outline' : 'solid'}
            borderColor={colorMode === 'light' ? 'black' : undefined}
            _hover={{
              backgroundColor: colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.500',
            }}>
            Learn More
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
            Infrastructure as a Service
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            Your Virtual Private Data Center at the Highest Altitude
          </Heading>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={16}
            my={16}
            maxW={[null, null, '80%']}>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Compute
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                The Orion compute infrastructure is built to sustain the most intense workloads your
                business can demand. As an engineer-led team with some of the highest performance
                standards in the universe, we don't mess around when it comes to our infrastructure.
                <Br />
                Our servers are packed with high-performance Intel CPUs, the fastest RAM money can
                buy, and dedicated 100 Gbps networking.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Storage
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                As one of the fastest moving cloud platforms on the planet, we're obsessed with
                guaranteeing insanely fast I/O performance.
                <Br />
                Orion production workloads uncompromisingly run on 100% dedicated SSD storage arrays
                backed by 160 Gbps of storage networking capacity per array. Our servers are packed
                with high-performance Intel CPUs, the fastest RAM money can buy, and dedicated 100
                Gbps networking.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Platform
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                The Orion platform is completely powered by VMware, so you can rest easy knowing
                your critical infrastructure is running on the most reliable hypervisor in
                existence.
                <Br />
                Orion natively supports virtually any operating system in existence, and can be
                easily populated with your own custom ISO builds if needed.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Security
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                Keeping invaders away from your cloud resources is critically important. With the
                Orion premium next-generation firewall service powered by Palo Alto Networks, your
                cloud resources can take advantage of full application layer visibility and control,
                known and unknown threat prevention, malware prevention, and inbound and outbound
                SSL decryption.
              </Text>
            </Box>
          </Grid>
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
            Data Protection
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            We've got you covered
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={16} my={16} maxW={[null, null, '80%']}>
            <Box>
              <Heading as="h4" fontSize="xl" mb={4}>
                Backups as a Service
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                At Stellar, one of the core components to our engineering culture is the concept
                notion that backups are Priority 1. Having a comprehensive data protection strategy
                that properly safeguards critical business data is literally _the_ most important
                objective a technology-driven organization can have.
                <Br />
                With the power of the Orion cloud platform, we offer one of the most robust,
                customizable, and _fastest_ backup platforms in the world, powered by Veeam. With
                our atomically low RPOs & RTOs, enterprises can rest assured that their critical
                data is not only protected, but easily recoverable when diaster strikes.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="xl" mb={4}>
                Disaster Recovery as a Service
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                Disaster recovery takes data protection beyond basic file recovery. With Orion's
                DRaaS platform, powered by VMware and Veeam , our team of data protection engineers
                can fail over your entire IT infrastructure environment in minutes, should an
                inevitable disaster occur.
              </Text>
            </Box>
          </Grid>
        </Flex>
      </Box>
      <Box
        ref={sect4Ref}
        as="section"
        py={24}
        overflow="hidden"
        bg={sect4Bg[colorMode]}
        {...sectBorder[colorMode]}>
        <Flex
          h="100%"
          overflow="hidden"
          px={24}
          py={16}
          alignItems="center"
          flexDir="column"
          color={sect4Text[colorMode]}>
          <Heading as="h3" fontSize="4xl">
            Virtual Desktop Infrastructure
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            The smart, secure way to never deal with PCs again
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={16} my={16} maxW={[null, null, '80%']}>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                High Performance Desktops for Everyone
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                With Orion VDI, end users can take full advantage of our blazing fast platform in
                their every day workloads, while you focus on adding value to your business instead
                of worrying about which PCs need upgrading this year.
                <Br />
                Upgrading a user's CPU, RAM, or disk space is just ten seconds of your time, and
                user workflows never miss a beat!
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Truly Secure Mobile Workforce
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                Worried about your mobile users getting compromised while getting their work done at
                a coffee shop? With VDI, user desktops never leave your secure cloud perimeter, so
                there's no need to worry about disk encryption, man-in-the-middle attacks, or data
                loss.
              </Text>
            </Box>
          </Grid>
        </Flex>
      </Box>
      <Box
        ref={sect5Ref}
        as="section"
        py={24}
        overflow="hidden"
        bg={sect5Bg[colorMode]}
        {...sectBorder[colorMode]}>
        <Flex
          h="100%"
          overflow="hidden"
          px={24}
          py={16}
          alignItems="center"
          flexDir="column"
          color={sect5Text[colorMode]}>
          <Heading as="h3" fontSize="4xl">
            Network Connectivity
          </Heading>
          <Heading as="h4" fontSize="xl" fontWeight="light">
            Travel on your Cloud Journey at the Speed of Light
          </Heading>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={16}
            my={16}
            maxW={[null, null, '80%']}>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Backbone
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                Behind the Orion platform is our transcontinental & transpacific core network. Each
                of our strategically located data centers is redundantly interconnected with the
                rest of the Orion ecosystem via 10 Gbps transport paths, ensuring always-on
                availability and uncompromising speed.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Upstream Interconnection
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                We're as choosy with our transit carriers as we are with our CPUs — this means we
                only partner with the best Tier 1 carriers, and leverage local peering whenever
                possible to guarantee the lowest latency to Orion for our end users.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Features
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                Our internet services come fully loaded with cutting edge technologies and IP
                transit features:
              </Text>
            </Box>
            <Box>
              <Heading as="h4" fontSize="lg" mb={4}>
                Private Extensions
              </Heading>
              <Text whiteSpace="pre-line" fontSize="lg" textAlign="justify">
                To make sure Orion is a true extension of the enterprise, we support private
                connectivity of virtually any type. Whether it's an MPLS circuit from your existing
                global carrier, a metro ethernet link, or your own physical VPN endpoint, we'll make
                it happen.
                <Br />
                To simplify connectivity even further, we offer a premium SD-WAN cloud extension
                service which can automatically combine any existing bandwidth mediums with
                per-packet load balancing, perform end-to-end QoS prioritization, and guarantee
                always-on cloud connectivity.
              </Text>
            </Box>
          </Grid>
        </Flex>
      </Box>
    </>
  );
};

export default Cloud;

export const getStaticProps = async ctx => {
  let contentUrl = '';
  let geoData = {};
  let content = {};
  contentUrl = [
    process.env.CONTENTFUL_BASEURL,
    '/',
    process.env.CONTENTFUL_SPACE,
    '/entries',
    '?access_token=',
    process.env.CONTENTFUL_KEY,
  ].join('');

  try {
    const geoRes = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
    const contentRes = await fetch(`${contentUrl}&content_type=pageContent&fields.page[in]=cloud`);
    geoData = await geoRes.json();
    content = await contentRes.json();
  } catch (err) {
    console.error(err);
  }
  return { props: { geoData, contentUrl, content } };
};
