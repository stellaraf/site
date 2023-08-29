import { useRef } from "react";

import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";

import { HomeSection, SEO, Screen, Testimonials } from "~/components";
import { useConfig } from "~/context";
import { useGradient, useNavLogo, useResponsiveStyle } from "~/hooks";
import { homePageQuery, commonStaticPropsQuery } from "~/queries";

import type { NextPage, GetStaticProps } from "next";
import type { HomePageProps } from "~/types";

// Separate component to limit unnecessary re-renders of the whole page on scroll.
const Logo = () => {
  const { colorMode } = useColorMode();
  const logoRef = useRef<SVGSVGElement>({} as SVGSVGElement);

  useNavLogo(logoRef);
  return (
    <Box overflowY="hidden" width={["90%", "66%", "33%"]} zIndex={1}>
      <StellarLogo colorMode={colorMode} width="100%" height="100%" ref={logoRef} />
    </Box>
  );
};

const Home: NextPage<HomePageProps> = props => {
  const { blocks, mainVideo } = props;
  const { slogan, organizationName } = useConfig();
  const rStyles = useResponsiveStyle();

  const bg = useGradient();

  return (
    <>
      <SEO title={organizationName} titleTemplate="%s" />
      <Box
        pt={32}
        zIndex={-2}
        minH="100vh"
        boxSize="100%"
        color="primary.500"
        _dark={{ color: "white" }}
        {...rStyles}
        {...bg}
      >
        <Flex flexDir="column" alignItems="center">
          <Logo />
          <Flex textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "1.5rem", md: "xl", lg: "2xl" }}
              fontWeight="light"
              mb={32}
            >
              {slogan}
            </Heading>
          </Flex>
        </Flex>
        <Flex justifyContent="center" w="100%">
          <Screen url={mainVideo.url} />
        </Flex>
      </Box>
      {blocks.map((block, i) => {
        return <HomeSection index={i % blocks.length} key={block.title} block={block} />;
      })}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ctx => {
  const preview = ctx?.preview ?? false;
  const homePage = await homePageQuery();
  const common = await commonStaticPropsQuery();
  return { props: { ...homePage, preview, common } };
};

export default Home;
