import { chakra, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { RichText } from "~/components";
import { useGradient, useResponsiveStyle } from "~/hooks";
import { shouldForwardProp } from "~/theme";

import type { HeroProps } from "./types";

const Container = chakra("div", {
  shouldForwardProp,
  baseStyle: { pt: 32, minH: "40vh", width: "100%" },
});

export const Hero = (props: HeroProps) => {
  const { title, subtitle, body, children, ...rest } = props;

  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  const fnTitle = useTitleCase();

  return (
    <Container className="__hero" {...bg} {...rStyles} {...rest}>
      <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
        <Flex
          textAlign="center"
          flexDir="column"
          alignItems="center"
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
          <Heading as="h1" fontSize={{ base: "4xl", lg: "6xl" }} fontWeight="light">
            {fnTitle(title)}
          </Heading>
          {subtitle && (
            <Heading as="h2" fontSize={{ base: "1.5rem", lg: "3xl" }} fontWeight="light">
              {fnTitle(subtitle)}
            </Heading>
          )}
          <RichText content={body} />
        </Flex>
      </Flex>
      {children && children}
    </Container>
  );
};
