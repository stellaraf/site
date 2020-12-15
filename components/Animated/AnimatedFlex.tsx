import { forwardRef } from 'react';
import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';
import type { IAnimatedFlex } from './types';

export const AnimatedFlex = forwardRef<HTMLDivElement, IAnimatedFlex>((props, _) => {
  const { transition, ...rest } = props;
  const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((motionProps, motionRef) => (
    <motion.div ref={motionRef} transition={transition} {...motionProps} />
  ));
  return <Flex as={MotionDiv} {...rest} />;
});
