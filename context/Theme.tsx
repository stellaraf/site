import * as React from 'react';
import { ThemeProvider as ChakraThemeProvider, useTheme as useChakraTheme } from '@chakra-ui/core';
import { CustomTheme } from 'site/util/theme';

interface ThemeProviderProps {
  theme: CustomTheme;
  children: React.ReactElement;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => (
  <ChakraThemeProvider theme={theme}>{children}</ChakraThemeProvider>
);

export const useTheme: () => CustomTheme = useChakraTheme as () => CustomTheme;
