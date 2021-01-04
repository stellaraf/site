import type { BoxProps, IconProps } from '@chakra-ui/react';

export interface ILogoMain {
  showReserved: boolean;
  noAnimate: boolean;
}

export interface ILogo extends BoxProps {
  size?: number;
  showReserved?: boolean;
  showTagline?: boolean;
  noAnimate?: boolean;
}

export interface ILogoIcon extends IconProps {}
