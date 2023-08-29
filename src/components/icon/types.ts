import type { BoxProps } from "@chakra-ui/react";

export interface IconProps extends Omit<BoxProps, "color"> {
  url: string;
  size?: number;
  color?: string;
}
