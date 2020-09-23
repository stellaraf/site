import * as React from 'react';
import { Box } from '@chakra-ui/core';

import type { BoxProps } from './types';

export const Wrapper = (props: BoxProps) => (
  <Box id="__wrapper" minH="100vh" h="100%" zIndex={-1} {...props} />
);
export const Main = (props: BoxProps) => <Box as="main" overflowX="hidden" {...props} />;
export const Root = (props: BoxProps) => <Box id="__content" h="100%" minH="50vh" {...props} />;
