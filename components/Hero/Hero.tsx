import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useGradient } from 'site/hooks';

import type { HeroProps } from './types';

export const Hero = forwardRef<HTMLDivElement, HeroProps>((props, ref) => {
  const { title, subtitle, body, children, ...rest } = props;
  const bg = useGradient();
  return (
    <Box ref={ref} w="100%" minH="40vh" px={24} pt={32} bg={bg} {...rest}>
      <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
        <Flex textAlign="center" flexDir="column" alignItems="center">
          <Heading as="h1" fontSize="6xl" fontWeight="light">
            {title}
          </Heading>
          {subtitle && (
            <Heading as="h2" fontSize="3xl" fontWeight="light">
              {subtitle}
            </Heading>
          )}
          {body && (
            <Heading as="h3" mt={8} fontSize="lg" fontWeight="normal" maxW={[null, null, '75%']}>
              {body}
            </Heading>
          )}
        </Flex>
      </Flex>
      {children && children}
    </Box>
  );
});
