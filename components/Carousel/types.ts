import type { BoxProps } from '@chakra-ui/core';
import type { ReactNodeArray } from 'react';

export interface CarouselProps extends BoxProps {
  interval?: number;
  noDots?: boolean;
  dotColor?: string;
  children: ReactNodeArray;
}

export type SetCurrent = (c: number) => void;

export interface UseCarousel {
  total: number;
  current: number;
  setCurrent: SetCurrent;
}

export type DotProps = BoxProps;
