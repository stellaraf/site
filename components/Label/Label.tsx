import * as React from 'react';
import { Flex } from '@chakra-ui/core';
import { useOpposingColor } from 'site/hooks';

import type { ILabel } from './types';

export const Label = (props: ILabel) => {
  const {
    left,
    right,
    leftColor: leftBg = 'primary.500',
    rightColor: rightBg = 'secondary.500',
    ...rest
  } = props;
  const leftColor = useOpposingColor(leftBg);
  const rightColor = useOpposingColor(rightBg);

  return (
    <Flex
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="flex-start"
      mx={[1, 2, 2, 2]}
      my={2}
      {...rest}>
      <Flex
        display="inline-flex"
        justifyContent="center"
        lineHeight="1.5"
        px={[1, 3, 3, 3]}
        whiteSpace="nowrap"
        mb={2}
        mr={0}
        py={1}
        bg={leftBg}
        color={leftColor}
        borderBottomLeftRadius={4}
        borderTopLeftRadius={4}
        borderBottomRightRadius={0}
        borderTopRightRadius={0}
        fontWeight="bold"
        fontSize={['xs', 'sm', 'sm', 'sm']}>
        {left}
      </Flex>
      <Flex
        display="inline-flex"
        justifyContent="center"
        lineHeight="1.5"
        fontWeight="medium"
        px={3}
        py={1}
        whiteSpace="nowrap"
        mb={2}
        ml={0}
        mr={0}
        bg={rightBg}
        color={rightColor}
        borderBottomRightRadius={4}
        borderTopRightRadius={4}
        borderBottomLeftRadius={0}
        borderTopLeftRadius={0}
        fontSize={['xs', 'sm', 'sm', 'sm']}>
        {right}
      </Flex>
    </Flex>
  );
};
