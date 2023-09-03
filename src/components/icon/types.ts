import type { BoxProps } from "@chakra-ui/react";
import type { ThemeTypings } from "@chakra-ui/styled-system";

export type Color = ThemeTypings["colorSchemes"];

export interface IconProps extends Omit<BoxProps, "color"> {
  url: string;
  size?: number;
  color?: Color;
}
