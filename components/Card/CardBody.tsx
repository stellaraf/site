import { forwardRef } from 'react';
import { VStack } from '@chakra-ui/core';

import type { ICardBody } from './types';

export const CardBody = forwardRef<HTMLDivElement, ICardBody>((props, ref) => {
  const { spacing = 8, ...rest } = props;
  return <VStack ref={ref} zIndex={1} boxSize="100%" spacing={spacing} pos="relative" {...rest} />;
});
