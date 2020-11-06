import { useMemo } from 'react';
import { Center, Heading, VStack, Divider } from '@chakra-ui/core';
import { Button, Ripple } from 'site/components';
import { useColorValue } from 'site/context';
import { useTitle, useRender, useOpposingColor, useIsDark, useGlow } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { IGetStarted } from './types';

export const GetStarted = (props: IGetStarted) => {
  const { title, subtitle, body = null, buttonLink, buttonText, ...rest } = props;
  const rStyles = useResponsiveStyle();
  const isDarkMode = useColorValue(false, true);
  const bg = useColorValue('original.secondary', 'original.purple');
  const rippleStart = useColorValue('secondary.200', 'secondary.700');
  const color = useOpposingColor(bg);
  const isDark = useIsDark(bg);
  const glow = useGlow('original.purple', 'purple.800');

  const titleMe = useTitle();
  const renderedBody = useRender(body);

  const hasButton = useMemo(
    () => typeof buttonLink !== 'undefined' && typeof buttonText !== 'undefined',
    [buttonText, buttonLink],
  );
  const my = useColorValue({ base: 4, lg: 16, xl: 64 }, { base: 32, xl: 64 });
  return (
    <Center
      bg={isDarkMode ? glow.backgroundColor : bg}
      py={16}
      my={my}
      w="100%"
      minH="xs"
      as="section"
      pos="relative"
      overflow="hidden"
      transition="box-shadow, background 0.2s ease-in-out"
      px={{ base: 4, lg: 16, xl: 64 }}
      boxShadow={isDarkMode ? glow.boxShadow : undefined}
      {...rStyles}
      {...rest}>
      {!isDarkMode && <Ripple start={rippleStart} stop={bg} />}
      <VStack spacing={{ base: 4, lg: 8 }} color={color}>
        <VStack>
          <Heading as="h2" fontSize="2xl">
            {titleMe(title)}
          </Heading>
          {subtitle && (
            <Heading as="h3" fontSize="lg" fontWeight="light">
              {titleMe(subtitle)}
            </Heading>
          )}
        </VStack>
        {body && <Divider bg={color} />}
        {body && renderedBody}
        {hasButton && (
          <Button
            color={color}
            variant="outline"
            href={buttonLink}
            borderColor={color}
            _hover={{ backgroundColor: isDark ? 'blackAlpha.100' : 'whiteAlpha.100' }}>
            {titleMe(buttonText!)}
          </Button>
        )}
      </VStack>
    </Center>
  );
};
