import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/core';
import { AnimatePresence, motion } from 'framer-motion';

import type { BoxProps } from '@chakra-ui/core';

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      />
    </AnimatePresence>
  );
};

export const Wrapper = (props: BoxProps) => (
  <Box id="__wrapper" minH="100vh" h="100%" zIndex={-1} overflowX="hidden" {...props} />
);
export const Main = (props: BoxProps) => <Box as="main" {...props} />;
