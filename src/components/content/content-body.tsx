import { Box } from "@chakra-ui/react";

import type { BoxProps } from "@chakra-ui/react";

export const ContentBody = (props: BoxProps) => (
  <Box
    zIndex={1}
    fontSize="lg"
    maxW={{ base: "100%", lg: "60%" }}
    whiteSpace="pre-line"
    my={{ base: 8, lg: 16 }}
    className="__st-content-body"
    {...props}
  />
);
