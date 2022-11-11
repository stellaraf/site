/* eslint-disable import/no-unused-modules */
import { useMemo } from "react";

import {
  useToken,
  ChakraProvider,
  useColorModeValue,
  createLocalStorageManager,
  createCookieStorageManager,
  useTheme as useChakraTheme,
} from "@chakra-ui/react";

import { makeTheme } from "~/theme";

import type { UseTheme, UIProviderProps } from "./types";

export const UIProvider = (props: UIProviderProps) => {
  const { theme, children, cookies } = props;

  const fullTheme = useMemo(() => makeTheme(theme), []);

  const colorModeManager = useMemo(() => {
    if (typeof cookies === "string") {
      return createCookieStorageManager("stellar-site");
    } else {
      return createLocalStorageManager("stellar-site");
    }
  }, [cookies]);

  return (
    <ChakraProvider resetCSS theme={fullTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export const useTheme: UseTheme = useChakraTheme;

/**
 * Get a color token value based on color-mode.
 */
export const useColorTokenValue = (light: string, dark: string) =>
  useColorModeValue(useToken("colors", light), useToken("colors", dark));

export { useColorMode, useColorModeValue as useColorValue } from "@chakra-ui/react";
