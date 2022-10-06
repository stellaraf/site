import type { BoxProps } from "@chakra-ui/react";

export interface CarouselProps extends BoxProps {
  interval?: number;
  noDots?: boolean;
  dotColor?: string;
  children: React.ReactNode[];
}

export type SetCurrent = (c: number) => void;

export interface UseCarousel {
  total: number;
  current: number;
  setCurrent: SetCurrent;
}

export interface CarouselContextProps {
  value: UseCarousel;
}

export type DotProps = BoxProps;
