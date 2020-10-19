import type { ComponentType } from 'react';
import type { FlexProps } from '@chakra-ui/core';
import type { IconType } from '@meronex/icons';

export interface IIcon extends Omit<FlexProps, 'color'> {
  icon?: ComponentType<IconType> | string;
  size?: number;
  color?: string;
}
