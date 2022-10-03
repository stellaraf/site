import type { BoxProps } from '@chakra-ui/react';
import type { DynamicIconProps } from '~/components';

interface Base {
  size?: number;
  color?: string;
}

interface IconFromURLProps extends Base, Omit<BoxProps, 'color'> {
  url: string;
}

interface IconFromIconProps extends Base, Omit<DynamicIconProps, 'color'> {}

export type IconProps = IconFromURLProps | IconFromIconProps;
