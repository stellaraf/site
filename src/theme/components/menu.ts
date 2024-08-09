import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys,
);

const baseStyle = definePartsStyle({
  list: {
    bg: "white",
    _dark: {
      bg: "blackSolid.800",
    },
  },
  item: {
    bg: "white",
    _dark: {
      bg: "blackSolid.800",
    },
    _hover: {
      bg: "gray.100",
      _dark: {
        bg: "whiteAlpha.200",
      },
    },
  },
});

export const menu = defineMultiStyleConfig({ baseStyle });
