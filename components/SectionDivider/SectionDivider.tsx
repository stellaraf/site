import * as React from 'react';
import { Box } from '@chakra-ui/core';

import type { BoxProps } from '@chakra-ui/core';

export const SectionDivider = (props: BoxProps) => {
  return (
    <Box
      pos="absolute"
      height="1px"
      width="100%"
      bg="original.tertiary"
      boxShadow="0 0 15px #4CC9F0, 0 0 25px #2b3c8f, 0 0 35px #2a174a"
      {...props}
    />
  );
};
