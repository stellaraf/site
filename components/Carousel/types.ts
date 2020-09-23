import type { BoxProps } from '@chakra-ui/core';
import type { ReactNodeArray } from 'react';
import type { TransitionFn } from 'react-spring';

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
  transition: TransitionFn;
  setCurrent: SetCurrent;
}

export interface CarouselContextProps {
  value: UseCarousel;
}

export type DotProps = BoxProps;
