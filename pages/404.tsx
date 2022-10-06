import { useRouter } from "next/router";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { SEO } from "~/components";
import { useColorValue } from "~/context";
import { useGradient, useResponsiveStyle } from "~/hooks";

const NotFound = () => {
  const heroText = useColorValue("black", "white");
  const pathText = useColorValue("red.500", "red.300");
  const rStyles = useResponsiveStyle();
  const bg = useGradient();
  const { asPath } = useRouter();

  return (
    <>
      <SEO title="Not Found" noindex nofollow />
      <Flex
        w="100%"
        h="100vh"
        color={heroText}
        pt={32}
        zIndex={-2}
        align="center"
        justify="center"
        {...rStyles}
        {...bg}
      >
        <Heading
          as="h1"
          fontSize={{ base: "1.5rem", md: "xl", lg: "2xl" }}
          fontWeight="light"
          mb={32}
        >
          <Box as="span" color={pathText}>{`${asPath} `}</Box>
          is not a thing...yet.
        </Heading>
      </Flex>
    </>
  );
};
export default NotFound;
