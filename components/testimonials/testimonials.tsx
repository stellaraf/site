import { useMemo } from 'react';
import { Center, VStack } from '@chakra-ui/react';
import { AnimatedDiv } from '~/components';
import { useColorValue, useConfig } from '~/context';
import { useOpposingColor, useGlow, useResponsiveStyle } from '~/hooks';
import { randomArrayItem } from '~/util';
import { Testimonial } from './testimonial';

import type { CenterProps } from '@chakra-ui/react';

export const Testimonials = (props: CenterProps): JSX.Element => {
  const { testimonials } = useConfig();
  const testimonial = useMemo(() => randomArrayItem(testimonials), []);

  const rStyles = useResponsiveStyle();
  const isDarkMode = useColorValue(false, true);
  const bg = useColorValue('light.500', 'blackSolid.500');
  const color = useOpposingColor(bg);
  const glow = useGlow('blackSolid.500', 'blackSolid.500');
  const my = useColorValue({ base: 4, lg: 16, xl: 64 }, { base: 32, xl: 64 });

  return (
    <Center
      py={16}
      my={my}
      w="100%"
      minH="xs"
      as="section"
      pos="relative"
      overflow="hidden"
      px={{ base: 4, lg: 16, xl: 64 }}
      bg={isDarkMode ? glow.backgroundColor : bg}
      boxShadow={isDarkMode ? glow.boxShadow : undefined}
      transition="box-shadow, background 0.2s ease-in-out"
      {...rStyles}
      {...props}
    >
      <VStack
        color={color}
        borderRadius="md"
        spacing={{ base: 4, lg: 8 }}
        bg={isDarkMode ? undefined : 'white'}
        boxShadow={isDarkMode ? undefined : 'xl'}
      >
        <AnimatedDiv zIndex={1} animate={{ x: 0 }} initial={{ x: '100%' }}>
          <Testimonial {...testimonial} />
        </AnimatedDiv>
      </VStack>
    </Center>
  );
};
