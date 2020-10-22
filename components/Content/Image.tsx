import * as React from 'react';
import { Box, Image as ChakraImage } from '@chakra-ui/core';

import type { IImage } from './types';

export const Image = (props: IImage) => {
  const { src, boxSize = 'xl', ...rest } = props;
  return (
    <Box boxSize={boxSize} {...rest}>
      <ChakraImage src={src} boxSize={boxSize} />
    </Box>
  );
};
