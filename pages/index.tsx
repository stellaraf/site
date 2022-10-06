import { useRef } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";

import { HomeSection, SEO, Screen, Testimonials } from "~/components";
import { useConfig, useColorMode, useColorValue } from "~/context";
import { useGradient, useNavLogo, useResponsiveStyle } from "~/hooks";
import { getParsedContent } from "~/util";

import type { GetStaticProps } from "next";
import type { THome, THomePageContent } from "~/types";

const Home = (props: THome) => {
  const { pageContent } = props;
  const { colorMode } = useColorMode();
  const { sections: homeSections, mainVideo } = pageContent;
  const { siteSlogan, orgName, homePageVideo } = useConfig();
  const heroText = useColorValue("primary.500", "white");
  const rStyles = useResponsiveStyle();

  const bg = useGradient();

  const sections = homeSections.sort((a, b) => a.fields.sortWeight - b.fields.sortWeight);
  const logoRef = useRef<SVGSVGElement>({} as SVGSVGElement);

  useNavLogo(logoRef);

  return (
    <>
      <SEO title={orgName} titleTemplate="%s" />
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
              {siteSlogan}
            </Heading>
          </Flex>
        </Flex>
        <Flex justifyContent="center" w="100%">
          {typeof mainVideo !== "undefined" ? (
            <Screen url={mainVideo.fields.file.url} />
          ) : typeof homePageVideo !== "undefined" ? (
            <Screen url={homePageVideo} />
          ) : null}
        </Flex>
      </Box>
      {sections.map((sect, i) => {
        return <HomeSection section={sect.fields} index={i % sections.length} key={i} />;
      })}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<THome> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageContent = {} as THomePageContent;
  try {
    [pageContent] = await getParsedContent<THomePageContent>("homepage", preview, {
      include: 4,
    });
  } catch (err) {
    console.error(err);
  }
  return { props: { pageContent, preview } };
};

export default Home;
