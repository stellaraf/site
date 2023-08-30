import { chakra, Box } from "@chakra-ui/react";

import { AnimatedDiv } from "~/components";

import type { BoxProps } from "@chakra-ui/react";

export const Root = (props: BoxProps) => {
  return <Box id="__content" h="100%" minH="50vh" {...props} />;
};

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
