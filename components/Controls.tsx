import * as React from 'react';
import { Box, Button, Stack } from '@chakra-ui/core';
import { WiDaySunny } from 'react-icons/wi';
import { BsMoon } from 'react-icons/bs';
import { FaChevronUp } from 'react-icons/fa';
import { useColorMode } from '../context';

const bg = { dark: 'original.tertiary', light: 'original.secondary' };
const color = { dark: 'original.dark', light: 'original.light' };

const iconColor = { dark: 'yellow', light: 'red' };
const icon = { dark: WiDaySunny, light: BsMoon };

const scrollToTop = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.document.activeElement.blur();
};

export const Controls = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeLabel = `Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      pos="fixed"
      bottom="25px"
      right="0"
      w="2rem"
      borderTopLeftRadius="xl"
      borderBottomLeftRadius="xl"
      h="6rem"
      py={4}
      bg={bg[colorMode]}
      color={color[colorMode]}
      zIndex={1}
      {...props}>
      <Stack pos="relative" flexDir="column">
        <Button
          py={2}
          onClick={toggleColorMode}
          variant="unstyled"
          minW="unset"
          h="unset"
          title={colorModeLabel}
          aria-label={colorModeLabel}>
          <Box as={icon[colorMode]} color={iconColor[colorMode]} />
        </Button>
        <Button
          py={2}
          onClick={scrollToTop}
          variant="unstyled"
          minW="unset"
          h="unset"
          aria-label="Scroll to Top"
          title="Scroll to Top">
          <Box as={FaChevronUp} color={iconColor[colorMode]} />
        </Button>
      </Stack>
    </Box>
  );
};
