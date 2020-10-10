import * as React from 'react';
import { Flex, Icon as ChakraIcon } from '@chakra-ui/core';
import { useOpposingColor } from 'site/hooks';

import type { IIcon } from './types';

export const Icon = (props: IIcon) => {
  const { color: bg = 'original.primary', icon, size = 20, ...rest } = props;
  const color = useOpposingColor(bg);
  return (
    <Flex
      bg={bg}
      boxSize={size}
      align="center"
      justify="center"
      borderRadius="full"
      color={color}
      {...rest}>
      <ChakraIcon as={icon} boxSize="50%" />
    </Flex>
  );
};
