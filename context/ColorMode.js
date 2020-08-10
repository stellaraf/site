import * as React from 'react';
import dynamic from 'next/dynamic';

const ChakraColorModeProvider = dynamic(() =>
  import('@chakra-ui/core').then(i => i.ColorModeProvider),
);

export { useColorMode } from '@chakra-ui/core';

export const ColorModeProvider = ({ children }) => (
  <ChakraColorModeProvider value="light">{children}</ChakraColorModeProvider>
);
