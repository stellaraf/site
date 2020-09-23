import type { BoxProps, IconProps } from '@chakra-ui/core';

export type LogoIconProps = IconProps;

export interface LogoMainProps {
  showReserved: boolean;
}

export interface LogoProps extends BoxProps {
  size?: number;
  showReserved?: boolean;
  showTagline?: boolean;
}
