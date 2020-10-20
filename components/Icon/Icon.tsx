import * as React from 'react';
import { Box, Flex, Icon as ChakraIcon, Image } from '@chakra-ui/core';
import { useOpposingColor } from 'site/hooks';
import { useColorValue } from 'site/context';
import type { IIcon } from './types';

export const Icon = (props: IIcon) => {
  const { color: bgColor = 'primary', icon, size = 20, ...rest } = props;
  const bg = useColorValue(`original.${bgColor}`, `${bgColor}.300`);
  const color = useOpposingColor(bg);
  let component = null;
  if (typeof icon === 'string') {
    component = (
      <Box css={{ mask: `url(${icon}) no-repeat center` }} backgroundColor={color} boxSize="50%" />
    );
  } else if (typeof icon === 'undefined') {
    component = <ChakraIcon boxSize="50%" />;
  } else {
    component = <ChakraIcon as={icon} boxSize="50%" />;
  }

  return (
    <Flex
      bg={bg}
      minWidth={size}
      height={size}
      align="center"
      justify="center"
      borderRadius="full"
      color={color}
      overflow="hidden"
      {...rest}>
      {component}
    </Flex>
  );
};
