/* eslint-disable import/no-unused-modules */
import { useMemo } from "react";

import {
  ChakraProvider,
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
