import { chakra } from "@chakra-ui/react";

export const FallbackLayout = chakra("div", {
  baseStyle: {
    px: { base: 4, md: 4, lg: 16, xl: 24 },
    alignItems: "center",
    flexDir: "column",
    minH: "40vh",
    w: "100%",
    d: "flex",
    pt: 32,
  },
});
