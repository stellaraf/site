import * as React from 'react';
import { Box, Flex, List, ListItem } from '@chakra-ui/core';
import { useColorMode, useConfig } from '../context';

const bg = { dark: 'original.dark', light: 'original.dark' };

export const Footer = props => {
  const { colorMode } = useColorMode();
  const config = useConfig();
  return (
    <Box as="footer" pt={24} pb={12} w="100%" bg={bg[colorMode]} color="white" {...props}>
      <Flex px={24} maxW={[null, null, '60%']} justifyContent="center"></Flex>
    </Box>
  );
};
