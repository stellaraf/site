import { useMemo } from 'react';
import { ChakraProvider, useTheme as useChakraTheme } from '@chakra-ui/core';
import { makeTheme } from 'site/util';

import type { TUseTheme, IUIProvider } from './types';

export const UIProvider = (props: IUIProvider) => {
  const { theme, children } = props;
  const generatedTheme = useMemo(() => makeTheme(theme), [theme]);
  return (
    <ChakraProvider resetCSS theme={generatedTheme}>
      {children}
    </ChakraProvider>
  );
};
export const useTheme: TUseTheme = useChakraTheme;

export { useColorMode } from '@chakra-ui/core';
export { useColorModeValue as useColorValue } from '@chakra-ui/core';
