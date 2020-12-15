import type { MotionProps } from 'framer-motion';
import type { BoxProps, FlexProps } from '@chakra-ui/react';

export interface IAnimatedBox extends Animated<BoxProps> {
  transition?: MotionProps['transition'];
}

export interface IAnimatedFlex extends Animated<FlexProps> {
  transition?: MotionProps['transition'];
}
