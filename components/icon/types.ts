import type { FlexProps } from '@chakra-ui/react';
import type { IconType } from '@meronex/icons';

export interface IIcon extends Omit<FlexProps, 'color'> {
  icon?: React.ComponentType<IconType> | string;
  size?: number;
  color?: string;
}
