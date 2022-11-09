import type { StyleObjectOrFn, SystemStyleObject } from "@chakra-ui/react";

const common: SystemStyleObject = {
  px: 3,
  py: 1,
  mx: 4,
  lineHeight: 1.5,
  borderRadius: "lg",
  transition: "all 0.2s",
};

export const button: Dict<Dict<StyleObjectOrFn>> = {
  variants: {
    heroPrimary: {
      ...common,
      bg: "linear-gradient(45deg,rgba(41,21,214,1) 0%,rgba(145,0,250,1) 51%,rgba(41,21,214,1) 100%)",
      color: "white",
      boxShadow: "lg",
      backgroundSize: "200% auto",
      _hover: {
        backgroundPosition: "right bottom",
      },
      _dark: {
        bg: "linear-gradient(45deg,rgba(80, 216, 215,1) 0%,rgba(113, 108, 233,1) 51%,rgba(80, 216, 215,1) 100%)",
        backgroundSize: "200% auto",
        color: "white",
        boxShadow: "md",
        _hover: { backgroundPosition: "right bottom" },
      },
    },
    heroSecondary: {
      ...common,
      bg: "light.50",
      color: "light.50.opposing",
      boxShadow: "lg",
      _hover: { bg: "blackAlpha.50", color: "blackAlpha.50.opposing" },
      _dark: {
        bg: "transparent",
        color: "inherit",
        borderColor: "white",
        borderWidth: "1px",
        boxShadow: "md",
        _hover: { bg: "whiteAlpha.100", color: "whiteAlpha.100.opposing" },
      },
    },
  },
};
