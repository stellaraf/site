import { mode } from "@chakra-ui/theme-tools";

import type { StyleObjectOrFn } from "@chakra-ui/react";

const common = { px: 3, py: 1, lineHeight: 1.5, borderRadius: "lg" } as StyleObjectOrFn;

export const heroButtons = {
  variants: {
    heroPrimary: (props: Dict) =>
      mode(
        {
          bg:
            "linear-gradient(45deg,rgba(41,21,214,1) 0%,rgba(145,0,250,1) 51%,rgba(41,21,214,1) 100%)",
          color: "white",
          boxShadow: "lg",
          transition: "all 0.2s",
          backgroundSize: "200% auto",
          mx: 4,
          _hover: {
            backgroundPosition: "right bottom",
          },
          ...common,
        },
        {
          bg:
            "linear-gradient(45deg,rgba(80, 216, 215,1) 0%,rgba(113, 108, 233,1) 51%,rgba(80, 216, 215,1) 100%)",
          backgroundSize: "200% auto",
          color: "white",
          boxShadow: "md",
          mx: 4,
          _hover: { backgroundPosition: "right bottom" },
          ...common,
        },
      )(props),
    heroSecondary: (props: Dict) =>
      mode(
        {
          bg: "light.50",
          color: "black",
          boxShadow: "lg",
          mx: 4,
          _hover: { bg: "blackAlpha.50" },
          ...common,
        },
        {
          bg: "transparent",
          color: "inherit",
          borderColor: "white",
          borderWidth: "1px",
          boxShadow: "md",
          mx: 4,
          _hover: { bg: "whiteAlpha.100" },
          ...common,
        },
      )(props),
  },
} as Dict<StyleObjectOrFn>;
