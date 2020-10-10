import * as React from 'react';
import { Stack } from '@chakra-ui/core';
import type { StackProps } from '@chakra-ui/core';

export const FieldGroup = (props: StackProps) => (
  <Stack
    w="100%"
    my={6}
    px={1}
    direction={{ base: 'column', lg: 'row' }}
    css={{ '&:first-of-type': { marginTop: '0.6rem' } }}
    {...props}
  />
);
