import * as React from 'react';
import { forwardRef } from 'react';
import { Box } from '@chakra-ui/core';
import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';
import type { BoxProps } from '@chakra-ui/core';
import type { Animated } from 'site/types';

interface IAnimatedBox extends Animated<BoxProps> {
  transition: MotionProps['transition'];
}

export const AnimatedBox = (props: IAnimatedBox) => {
  const { transition, ...rest } = props;
  const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((motionProps, motionRef) => (
    <motion.div ref={motionRef} transition={transition} {...motionProps} />
  ));
  return <Box as={MotionDiv} {...rest} />;
};
