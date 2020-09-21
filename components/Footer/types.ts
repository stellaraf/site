import type { BoxProps } from '@chakra-ui/core';
import type { FooterItem } from 'site/types';

export interface FooterProps extends BoxProps {
  groups: FooterItem[];
}

export interface StructuredItems<T> {
  [k: string]: T;
}
