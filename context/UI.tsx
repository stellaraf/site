import * as React from 'react';
import { ChakraProvider, useTheme as useChakraTheme } from '@chakra-ui/core';

import type { ReactNode } from 'react';
import type { CustomTheme } from 'site/types';

type UseTheme = () => CustomTheme;

interface UIProviderProps {
  theme: CustomTheme;
  children?: ReactNode;
}

export const UIProvider = ({ theme, children }: UIProviderProps) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {children}
    </ChakraProvider>
  );
};

export const useTheme: UseTheme = useChakraTheme;

export { useColorMode } from '@chakra-ui/core';
export { useColorModeValue as useColorValue } from '@chakra-ui/core';
