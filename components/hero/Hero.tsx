import { chakra, Flex, Heading } from '@chakra-ui/react';
import { useTitleCase } from 'use-title-case';
import { useGradient, useRender, useResponsiveStyle } from '~/hooks';
import { shouldForwardProp } from '~/util';

import type { IHero } from './types';

const Container = chakra('div', {
  shouldForwardProp,
  baseStyle: { pt: 32, minH: '40vh', width: '100%' },
});

export const Hero: React.FC<IHero> = (props: IHero) => {
  const { title, subtitle, body, children, ...rest } = props;

  const bg = useGradient();
  const rStyles = useResponsiveStyle();
  const titleMe = useTitleCase();
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
    <Container {...bg} {...rStyles} {...rest}>
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
    </Container>
  );
};
