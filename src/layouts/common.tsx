import { chakra } from "@chakra-ui/react";

import { AnimatedDiv } from "~/components";

import type { BoxProps } from "@chakra-ui/react";

export const Base = chakra("div", {
  baseStyle: {
    height: "100%",
    minHeight: "50vh",
  },
});

export const Wrapper = (props: Animated<BoxProps>) => (
  <AnimatedDiv
    h="100%"
    zIndex={-1}
    minH="100vh"
    id="__wrapper"
    overflowX="hidden"
    exit={{ opacity: 0.01 }}
    initial={{ opacity: 0.01 }}
    animate={{ opacity: 1 }}
    {...props}
  />
);

export const Main = chakra("main");
