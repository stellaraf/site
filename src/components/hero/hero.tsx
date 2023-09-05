import { chakra, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { RichText } from "~/components";
import { useGradient } from "~/hooks";
import { shouldForwardProp } from "~/theme";

import type { HeroProps } from "./types";

const Container = chakra("div", {
  shouldForwardProp,
  baseStyle: { pt: 32, minH: "40vh", width: "100%" },
});

export const Hero = (props: HeroProps) => {
  const { title, subtitle, body, children, ...rest } = props;

  const bg = useGradient();
  const fnTitle = useTitleCase();

  return (
    <Container className="__hero" layerStyle="container" {...bg} {...rest}>
      <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
        <Flex
          textAlign={{ base: "left", md: "center" }}
          flexDir="column"
          alignItems={{ base: "flex-start", md: "center" }}
          sx={{
            "& p": {
              mt: 8,
              as: "h3",
              zIndex: 1,
              fontSize: "lg",
              maxW: { lg: "75%" },
              fontWeight: "normal",
            },
          }}
        >
          <Heading as="h1" fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }} fontWeight="light">
            {fnTitle(title)}
          </Heading>
          {subtitle && (
            <Heading as="h2" fontSize={{ base: "lg", md: "xl", lg: "3xl" }} fontWeight="light">
              {fnTitle(subtitle)}
            </Heading>
          )}
          <Flex zIndex={1} flexDir="column" maxW={{ base: "100%", lg: "70%", xl: "66%" }}>
            <RichText content={body} />
          </Flex>
        </Flex>
      </Flex>
      {children && children}
    </Container>
  );
};
