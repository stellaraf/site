import type { BoxProps, StackProps } from '@chakra-ui/core';

export interface ICardBody extends BoxProps {
  spacing?: StackProps['spacing'];
}

export interface ICard extends StackProps {}
