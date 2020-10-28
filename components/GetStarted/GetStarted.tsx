import { useMemo } from 'react';
import { Center, Heading, VStack, Divider, useToken } from '@chakra-ui/core';
import { Button, Ripple } from 'site/components';
import { useColorValue } from 'site/context';
import { useTitle, useRender, useOpposingColor, useIsDark } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { IGetStarted } from './types';

export const GetStarted = (props: IGetStarted) => {
  const { title, subtitle, body = null, buttonLink, buttonText, ...rest } = props;

  const rStyles = useResponsiveStyle();
  const isDarkMode = useColorValue(false, true);
  const bg = useColorValue('original.secondary', 'secondary.300');
  const rippleStart = useColorValue('secondary.200', 'secondary.700');
  const color = useOpposingColor(bg);
  const isDark = useIsDark(bg);
  const one = useToken('colors', 'secondary.300');
  const two = useToken('colors', 'secondary.400');
  const three = useToken('colors', 'secondary.600');
  const four = useToken('colors', 'secondary.800');
  const boxShadow = `0 0 20px 20px ${one}, 0 0 40px 40px ${two}, 0 0 60px 60px ${three}, 0 0 80px 80px ${four}`;

  const titleMe = useTitle();
  const renderedBody = useRender(body);

  const hasButton = useMemo(
    () => typeof buttonLink !== 'undefined' && typeof buttonText !== 'undefined',
    [buttonText, buttonLink],
  );
  const my = useColorValue({ base: 4, lg: 16, xl: 64 }, { base: 32, xl: 64 });
  return (
    <Center
      minH="xs"
      bg={bg}
      w="100%"
      as="section"
      py={16}
      pos="relative"
      overflow="hidden"
      my={my}
      px={{ base: 4, lg: 16, xl: 64 }}
      transition="box-shadow 0.1s"
      boxShadow={isDarkMode ? boxShadow : undefined}
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
