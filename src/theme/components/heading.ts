import type { StyleObjectOrFn } from "@chakra-ui/react";

export const heading: Dict<StyleObjectOrFn> = {
  sizes: {
    "4xl": {
      lineHeight: 1,
    },
    "3xl": {
      lineHeight: 1,
    },
    "2xl": {
      lineHeight: [1.5, null, 1],
    },
    xl: {
      lineHeight: [1.5, null, 1.5],
    },
    lg: {
      lineHeight: [1.25, null, 1.25],
    },
    md: { lineHeight: 1.25 },
    sm: { lineHeight: 1 },
    xs: { lineHeight: 1 },
  },
};
