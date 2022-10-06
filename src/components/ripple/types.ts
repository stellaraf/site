import type { BoxProps } from "@chakra-ui/react";

export interface RippleProps extends BoxProps {
  start?: string;
  stop?: string;
}

export type UseInterpolatedColorsReturn = (n: number) => string;
