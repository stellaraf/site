import type { BoxProps } from "@chakra-ui/react";
import type { ThemeTypings } from "@chakra-ui/styled-system";

export type Color = ThemeTypings["colorSchemes"];

interface Dark extends Omit<Pick<BoxProps, "_dark">, "color"> {
  color?: Color;
}

interface IconBaseProps extends Omit<BoxProps, "color">, Dark {
  size?: number;
  color?: Color;
  url?: string;
  icon?: React.ElementType;
  iconSize?: BoxProps["boxSize"];
  noBackground?: boolean;
}

interface IconElementProps extends IconBaseProps {
  icon: React.ElementType;
  iconSize?: BoxProps["boxSize"];
  url?: never;
}

interface IconURLProps extends IconBaseProps {
  url: string;
  icon?: never;
  iconSize?: never;
}

export type IconProps = IconURLProps | IconElementProps;

export function isUrlIcon(props: IconProps): props is IconURLProps {
  return typeof props.url === "string" && typeof props.icon === "undefined";
}

export function isElementIcon(props: IconProps): props is IconElementProps {
  return typeof props.url === "undefined" && typeof props.icon === "function";
}
