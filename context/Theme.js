import * as React from "react";
import { useMemo } from "react";
import { ThemeProvider as ChakraThemeProvider } from "@chakra-ui/core";
import { useConfig } from "./Config";
import { makeTheme } from "../util";

export const ThemeProvider = ({ children }) => {
  const { theme } = useConfig();
  const value = useMemo(() => makeTheme(theme), [theme]);
  return <ChakraThemeProvider theme={value}>{children}</ChakraThemeProvider>;
};

export { useTheme } from "@chakra-ui/core";
