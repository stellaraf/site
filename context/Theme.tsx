import * as React from 'react';
import { useMemo } from 'react';
import { ThemeProvider as ChakraThemeProvider, useTheme as useChakraTheme } from '@chakra-ui/core';
import { useConfig } from './Config';
import { makeTheme, CustomTheme } from 'site/util/theme';

export const ThemeProvider = ({ children }) => {
  const { theme } = useConfig();
  const value = useMemo(() => makeTheme(theme), [theme]);
  return <ChakraThemeProvider theme={value}>{children}</ChakraThemeProvider>;
};

export const useTheme: () => CustomTheme = useChakraTheme as () => CustomTheme;
