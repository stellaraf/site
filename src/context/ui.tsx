/* eslint-disable import/no-unused-modules */
import { useMemo } from "react";

import {
  useToken,
  ChakraProvider,
  useColorModeValue,
  cookieStorageManagerSSR,
  localStorageManager,
  useTheme as useChakraTheme,
  type ColorModeProviderProps,
} from "@chakra-ui/react";

import { makeTheme } from "~/theme";

import type { UseTheme, UIProviderProps } from "./types";

type StorageManager = NonNullable<ColorModeProviderProps["colorModeManager"]>;

export const UIProvider = (props: UIProviderProps) => {
  const { theme, children, cookies, fonts } = props;

  const fullTheme = useMemo(() => makeTheme(theme, fonts), []);

  const colorModeManager = useMemo<StorageManager>(() => {
    if (typeof cookies === "string") {
      return cookieStorageManagerSSR(cookies);
    } else {
      return localStorageManager;
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
