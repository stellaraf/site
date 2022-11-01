import { chakra } from "@chakra-ui/react";

import { shouldForwardProp } from "~/theme";

export const Backdrop = chakra("div", {
  shouldForwardProp,
  baseStyle: {
    mx: "auto",
    zIndex: 1,
    pos: "relative",
    boxShadow: "xl",
    cursor: "pointer",
    overflow: "hidden",
    borderStyle: "solid",
    width: { base: "100%", lg: "75%", xl: "50%" },
    borderRadius: { base: "1rem", lg: "2rem" },
    borderWidth: { base: "0.2rem", lg: "0.4rem", xl: "0.8rem" },
    color: "light.500",
    borderColor: "light.500",
    _dark: {
      color: "dark.500",
      borderColor: "dark.500",
    },
  },
});
