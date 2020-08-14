import * as React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useColorMode } from '../context';

const bg = { dark: 'whiteAlpha.50', light: 'gray.600' };
const color = { dark: 'original.light', light: 'white' };

export const CalltoAction = props => {
  const { colorMode } = useColorMode();
  return (
    <Box
      className="__actions"
      py={24}
      px={24}
      bg={bg[colorMode]}
      borderBottomWidth="1px"
      borderBottomColor="original.tertiary"
      color={color[colorMode]}
      {...props}>
      <Flex justifyContent="space-between">
        <Heading as="h5" fontSize="2xl">
          Get Started
        </Heading>
      </Flex>
    </Box>
  );
};
