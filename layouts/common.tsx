import * as React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/core';
import { AnimatePresence, motion } from 'framer-motion';

import type { Animated } from 'site/types';
import type { BoxProps } from './types';

export const Root = (props: Animated<BoxProps>) => {
  const { route } = useRouter();
  return (
    <AnimatePresence>
      <Box
        id="__content"
        h="100%"
        minH="50vh"
        as={motion.div}
        key={route}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        {...props}
      />
    </AnimatePresence>
  );
};

export const Wrapper = (props: BoxProps) => (
  <Box id="__wrapper" minH="100vh" h="100%" zIndex={-1} overflowX="hidden" {...props} />
);
export const Main = (props: BoxProps) => <Box as="main" {...props} />;
// export const Root = (props: BoxProps) => <Box id="__content" h="100%" minH="50vh" {...props} />;
