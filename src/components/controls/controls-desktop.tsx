import { useCallback } from "react";

import { Button, VStack, chakra, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { ChevronUp, Moon, Sun } from "~/icons";

import type { BoxProps } from "@chakra-ui/react";

const Wrapper = chakra("div", {
  baseStyle: {
    py: 4,
    bg: "white",
    right: 0,
    zIndex: "modal",
    pos: "fixed",
    width: "2rem",
    height: "6rem",
    bottom: "25px",
    display: "flex",
    boxShadow: "md",
    alignItems: "center",
    borderTopWidth: "1px",
    borderLeftWidth: "1px",
    justifyContent: "center",
    borderBottomWidth: "1px",
    borderTopLeftRadius: "lg",
    borderColor: "blackAlpha.300",
    _dark: { bg: "blackAlpha.300", borderColor: "whiteAlpha.300" },
    borderBottomLeftRadius: "lg",
    backdropFilter: "blur(20px)",
  },
});

export const DControls = (props: BoxProps) => {
  const { toggleColorMode } = useColorMode();
  const switchTo = useColorModeValue("Dark", "Light");
  const colorModeLabel = `Switch to ${switchTo} Mode`;

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.document.activeElement instanceof HTMLElement) {
        window.document.activeElement.blur();
      }
    }
  }, []);

  return (
    <Wrapper {...props}>
      <VStack pos="relative" spacing={6}>
        <Button
          minW="unset"
          height="unset"
          variant="unstyled"
          title={colorModeLabel}
          onClick={toggleColorMode}
          aria-label={colorModeLabel}
          _hover={{ color: "secondary.500" }}
          _dark={{ _hover: { color: "tertiary.300" } }}
        >
          <Moon _dark={{ display: "none" }} />
          <Sun _light={{ display: "none" }} />
        </Button>
        <Button
          minW="unset"
          height="unset"
          variant="unstyled"
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to Top"
          _hover={{ color: "secondary.500" }}
          _dark={{ _hover: { color: "tertiary.300" } }}
        >
          <ChevronUp />
        </Button>
      </VStack>
    </Wrapper>
  );
};
