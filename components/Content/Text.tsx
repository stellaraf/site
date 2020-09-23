import * as React from 'react';
import { Box, Heading } from '@chakra-ui/core';

import type { BoxProps, HeadingProps, TitleProps } from './types';

export const Title = (props: TitleProps) => {
  const { id, ...rest } = props;
  return (
    <>
      <Box id={id} as="span" pos="relative" top={-130} visibility="hidden" />
      <Heading as="h3" fontSize="4xl" {...rest} />
    </>
  );
};

export const Subtitle = (props: HeadingProps) => (
  <Heading as="h4" fontSize="xl" fontWeight="light" {...props} />
);

export const Body = (props: BoxProps) => (
  <Box
    my={16}
    maxW={[null, null, '60%']}
    whiteSpace="pre-line"
    fontSize="lg"
    textAlign="justify"
    {...props}
  />
);
