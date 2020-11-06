import { forwardRef } from 'react';
import { Flex } from '@chakra-ui/core';
import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';
import type { FlexProps } from '@chakra-ui/core';

interface IAnimatedBox extends Animated<FlexProps> {
  transition?: MotionProps['transition'];
}

export const AnimatedFlex = forwardRef<HTMLDivElement, IAnimatedBox>((props, ref) => {
  const { transition, ...rest } = props;
  const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((motionProps, motionRef) => (
    <motion.div ref={motionRef} transition={transition} {...motionProps} />
  ));
  return <Flex as={MotionDiv} {...rest} />;
});
