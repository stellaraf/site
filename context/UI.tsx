import * as React from 'react';
import { useMemo } from 'react';
import { ChakraProvider, useTheme as useChakraTheme } from '@chakra-ui/core';
import { makeTheme } from 'site/util';

import type { UseTheme, UIProviderProps } from 'site/types';

export const UIProvider = (props: UIProviderProps) => {
  const { theme, children } = props;
  const generatedTheme = useMemo(() => makeTheme(theme), [theme]);
  return (
    <ChakraProvider resetCSS theme={generatedTheme}>
      {children}
    </ChakraProvider>
  );
};
export const useTheme: UseTheme = useChakraTheme;

export { useColorMode } from '@chakra-ui/core';
export { useColorModeValue as useColorValue } from '@chakra-ui/core';
