import { forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';
import type { IAnimatedBox } from './types';

export const AnimatedBox = forwardRef<HTMLDivElement, IAnimatedBox>((props, _) => {
  const { transition, ...rest } = props;
  const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((motionProps, motionRef) => (
    <motion.div ref={motionRef} transition={transition} {...motionProps} />
  ));
  return <Box as={MotionDiv} {...rest} />;
});
