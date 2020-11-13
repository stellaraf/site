import { forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';
import type { BoxProps } from '@chakra-ui/react';

interface IAnimatedBox extends Animated<BoxProps> {
  transition: MotionProps['transition'];
}

export const AnimatedBox = forwardRef<HTMLDivElement, IAnimatedBox>((props, ref) => {
  const { transition, ...rest } = props;
  const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((motionProps, motionRef) => (
    <motion.div ref={motionRef} transition={transition} {...motionProps} />
  ));
  return <Box as={MotionDiv} {...rest} />;
});
