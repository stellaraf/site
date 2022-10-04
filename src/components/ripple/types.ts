import type { BoxProps } from "@chakra-ui/react";

export interface IRipple extends BoxProps {
  start?: string;
  stop?: string;
}

export type UseInterpolatedColorsReturn = (n: number) => string;
