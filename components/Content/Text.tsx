import * as React from 'react';
import { Box, Heading } from '@chakra-ui/core';
import { useTitle } from 'site/hooks';

import type { BoxProps, TitleProps, ISubtitle } from './types';

export const Title = (props: TitleProps) => {
  const titleMe = useTitle();
  const { id, children, ...rest } = props;
  return (
    <>
      <Box id={id} as="span" pos="relative" top={-130} visibility="hidden" />
      <Heading
        as="h3"
        fontSize={{ base: '3xl', lg: '4xl' }}
        textAlign={{ base: 'center', xl: 'justify' }}
        {...rest}>
        {titleMe(children)}
      </Heading>
    </>
  );
};

export const Subtitle = (props: ISubtitle) => {
  const titleMe = useTitle();
  const { children, ...rest } = props;
  return (
    <Heading
      as="h4"
      fontSize={{ base: '1.5rem', lg: 'xl' }}
      fontWeight="light"
      textAlign={{ base: 'center', lg: 'justify' }}
      mt={8}
      {...rest}>
      {titleMe(children)}
    </Heading>
  );
};

export const Body = (props: BoxProps) => (
  <Box
    my={16}
    maxW={[null, null, '60%']}
    whiteSpace="pre-line"
    fontSize="lg"
    textAlign={{ base: 'left', lg: 'justify' }}
    {...props}
  />
);
