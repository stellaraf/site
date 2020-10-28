import { Box, Code as ChakraCode, Text } from '@chakra-ui/core';
import { useColorValue } from 'site/context';

import type { BlockQuoteProps, CodeProps, ParagraphProps } from './types';

export const P = (props: ParagraphProps) => <Text my={8} {...props} />;

export const BlockQuote = (props: BlockQuoteProps) => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const border = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  return (
    <Box
      my={8}
      pl={4}
      pt={2}
      pb={4}
      fontSize="lg"
      fontFamily="body"
      lineHeight="tall"
      fontWeight="light"
      position="relative"
      borderLeftWidth={2}
      backgroundColor={bg}
      borderLeftStyle="solid"
      borderLeftColor={border}
      {...props}
    />
  );
};

export const Code = (props: CodeProps) => {
  const scheme = useColorValue('blackAlpha', 'red');
  return <ChakraCode fontSize="sm" colorScheme={scheme} {...props} />;
};
