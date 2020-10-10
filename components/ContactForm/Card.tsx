import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/core';
import { useColorValue } from 'site/context';

import type { ICardBody } from './types';
import type { FlexProps } from '@chakra-ui/core';

export const CardBody = (props: ICardBody) => {
  const { children, spacing = 8, ...rest } = props;
  return (
    <Box pos="relative" boxSize="100%" {...rest}>
      <VStack pos="absolute" boxSize="100%">
        <VStack zIndex={1} boxSize="100%" spacing={spacing} pos="relative" overflow="hidden">
          {children}
        </VStack>
      </VStack>
    </Box>
  );
};

export const Card = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const styles = useColorValue(
    { bg: 'white', boxShadow: '2xl' },
    {
      bg: 'blackAlpha.400',
      css: { backdropFilter: 'blur(2px)' },
    },
  );
  return (
    <Flex
      p={8}
      w="md"
      h={props.minH ?? props.minHeight ?? props.height ?? props.h ?? 'md'}
      ref={ref}
      zIndex={1}
      pos="relative"
      flexDir="column"
      borderRadius="lg"
      {...styles}
      {...props}
    />
  );
});
