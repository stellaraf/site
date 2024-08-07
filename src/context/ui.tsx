/* eslint-disable import/no-unused-modules */
import { useMemo } from "react";

import {
  ChakraProvider,
  type ColorModeProviderProps,
  cookieStorageManagerSSR,
  localStorageManager,
  useTheme as useChakraTheme,
} from "@chakra-ui/react";

import { makeTheme } from "~/theme";

import type { UIProviderProps, UseTheme } from "./types";

type StorageManager = NonNullable<ColorModeProviderProps["colorModeManager"]>;

export const UIProvider = (props: UIProviderProps) => {
  const { theme, children, cookies } = props;

  const fullTheme = useMemo(() => makeTheme(theme), []);

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
