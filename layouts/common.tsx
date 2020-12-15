import { Box } from '@chakra-ui/react';
import { AnimatedBox } from 'site/components';

import type { BoxProps } from '@chakra-ui/react';
import type { IAnimatedBox } from 'site/components';

export const Root = (props: Animated<BoxProps>) => {
  return <Box id="__content" h="100%" minH="50vh" {...props} />;
};

export const Wrapper = (props: IAnimatedBox) => (
  <AnimatedBox
    h="100%"
    zIndex={-1}
    minH="100vh"
    id="__wrapper"
    overflowX="hidden"
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    {...props}
  />
);
export const Main = (props: BoxProps) => <Box as="main" {...props} />;
