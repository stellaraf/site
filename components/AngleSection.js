import * as React from "react";
import { Box } from "@chakra-ui/core";

export const AngleSection = ({
  color,
  transform = "skewY(-3deg)",
  transformOrigin = "top left",
  children,
  ...props
}) => {
  return (
    <Box overflow="hidden" position="relative" {...props}>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        left={0}
        w="100%"
        h="100%"
        bg={color}
        transform={transform}
        transformOrigin={transformOrigin}
      ></Box>
      {children}
    </Box>
  );
};
