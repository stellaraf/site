import type { BoxProps } from '@chakra-ui/react';

export interface ISectionDivider extends Omit<BoxProps, 'left' | 'right'> {
  left?: boolean;
  right?: boolean;
  straight?: boolean;
}
