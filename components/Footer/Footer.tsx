import * as React from 'react';
import { Box, Flex, List, ListItem } from '@chakra-ui/core';
import { useColorValue } from 'site/context';

import type { FooterProps } from './types';

export const Footer = (props: FooterProps) => {
  const bg = useColorValue('original.dark', 'original.dark');
  const color = useColorValue('white', 'white');
  return (
    <Box as="footer" pt={24} pb={12} w="100%" bg={bg} color={color} {...props}>
      <Flex px={24} maxW={[null, null, '60%']} justifyContent="center"></Flex>
    </Box>
  );
};
