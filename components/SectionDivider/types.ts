import type { BoxProps } from '@chakra-ui/core';

export interface ISectionDivider extends Omit<BoxProps, 'left' | 'right'> {
  left?: boolean;
  right?: boolean;
  straight?: boolean;
}
