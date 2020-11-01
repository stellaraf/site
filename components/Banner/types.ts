import type { ReactNode } from 'react';
import type { FlexProps } from '@chakra-ui/core';
import type { Animated } from 'site/types';

export interface IBanner extends Animated<FlexProps> {}

export interface IBannerContent {
  body: ReactNode;
  onClick: () => void;
}
