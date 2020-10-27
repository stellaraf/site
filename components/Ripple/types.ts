import type { BoxProps } from '@chakra-ui/core';

export interface IRipplePattern {
  start: string;
  stop: string;
}

export interface IRipple extends BoxProps {
  start?: string;
  stop?: string;
}
