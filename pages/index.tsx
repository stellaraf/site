import { useRef } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";

import { HomeSection, SEO, Screen, Testimonials } from "~/components";
import { useConfig, useColorMode, useColorValue } from "~/context";
import { useGradient, useNavLogo, useResponsiveStyle } from "~/hooks";
import { is } from "~/lib";
import { homePageQuery } from "~/queries";

import type { NextPage, GetStaticProps } from "next";
import type { HomePage } from "~/queries";

const Home: NextPage<HomePage> = props => {
  const { blocks, mainVideo } = props;
  const { colorMode } = useColorMode();
  const { slogan, organizationName } = useConfig();
  const heroText = useColorValue("primary.500", "white");
  const rStyles = useResponsiveStyle();

  const bg = useGradient();

  const logoRef = useRef<SVGSVGElement>({} as SVGSVGElement);

  useNavLogo(logoRef);

  return (
    <>
      <SEO title={organizationName} titleTemplate="%s" />
      <Box pt={32} zIndex={-2} minH="100vh" boxSize="100%" color={heroText} {...rStyles} {...bg}>
        <Flex flexDir="column" alignItems="center">
          <Box overflowY="hidden" width={["90%", "66%", "33%"]} zIndex={1}>
            <StellarLogo colorMode={colorMode} width="100%" height="100%" ref={logoRef} />
          </Box>
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
          {is(mainVideo) && <Screen url={mainVideo.url} />}
        </Flex>
      </Box>
      {blocks.map((block, i) => {
        return <HomeSection index={i % blocks.length} key={block.title} block={block} />;
      })}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePage> = async ctx => {
  const preview = ctx?.preview ?? false;
  const homePage = await homePageQuery();
  return { props: { ...homePage, preview } };
};

export default Home;
