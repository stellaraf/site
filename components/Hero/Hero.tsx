import { forwardRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { useGradient, useRender, useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { IHero } from './types';

export const Hero = forwardRef<HTMLDivElement, IHero>((props, ref) => {
  const { title, subtitle, body, children, ...rest } = props;
  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  const titleMe = useTitle();
  const renderedBody = useRender(body);
  return (
    <Box ref={ref} w="100%" minH="40vh" pt={32} {...bg} {...rStyles} {...rest}>
      <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
        <Flex textAlign="center" flexDir="column" alignItems="center">
          <Heading as="h1" fontSize={{ base: '4xl', lg: '6xl' }} fontWeight="light">
            {titleMe(title)}
          </Heading>
          {subtitle && (
            <Heading as="h2" fontSize={{ base: '1.5rem', lg: '3xl' }} fontWeight="light">
              {titleMe(subtitle)}
            </Heading>
          )}
          {body && (
            <Heading as="h3" mt={8} fontSize="lg" fontWeight="normal" maxW={[null, null, '75%']}>
              {renderedBody}
            </Heading>
          )}
        </Flex>
      </Flex>
      {children && children}
    </Box>
  );
});
