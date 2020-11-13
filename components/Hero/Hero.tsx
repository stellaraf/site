import { Box, Flex, Heading } from '@chakra-ui/react';
import { useGradient, useRender, useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';
import { validProps } from 'site/util';

import type { IHero } from './types';

export const Hero = (props: IHero) => {
  const { title, subtitle, body, children, ...rest } = props;
  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  const titleMe = useTitle();
  const renderedBody = useRender(body, [title], [], {
    paragraph: {
      mt: 8,
      as: 'h3',
      zIndex: 1,
      fontSize: 'lg',
      maxW: { lg: '75%' },
      fontWeight: 'normal',
    },
  });
  return (
    <Box w="100%" minH="40vh" pt={32} {...bg} {...rStyles} {...validProps(rest)}>
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
          {body && renderedBody}
        </Flex>
      </Flex>
      {children && children}
    </Box>
  );
};
