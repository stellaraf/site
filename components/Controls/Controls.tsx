import * as React from 'react';
import { Box, Button, Stack, useStyles } from '@chakra-ui/core';
import { MdWbSunny as Sun } from '@meronex/icons/md';
import { BsMoon as Moon } from '@meronex/icons/bs';
import { BsChevronUp as ChevronUp } from '@meronex/icons/bs';
import { useColorMode, useColorValue } from 'site/context';

import type { ControlsProps } from './types';

/**
 * SSR-safely smooth-scroll to the top of the viewport.
 */
const scrollToTop = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.document.activeElement instanceof HTMLElement) {
    window.document.activeElement.blur();
  }
};

export const Controls = (props: ControlsProps) => {
  const { toggleColorMode } = useColorMode();
  const styles = useStyles();
  const colorModeIcon = useColorValue(Moon, Sun);
  const switchTo = useColorValue('Dark', 'Light');
  const colorModeLabel = `Switch to ${switchTo} Mode`;
  return (
    <Box
      py={4}
      right={0}
      zIndex={1}
      pos="fixed"
      width="2rem"
      height="6rem"
      bottom="25px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderTopLeftRadius="xl"
      borderBottomLeftRadius="xl"
      sx={styles.controls}
      {...props}>
      <Stack pos="relative" flexDir="column">
        <Button
          py={2}
          minW="unset"
          height="unset"
          variant="unstyled"
          title={colorModeLabel}
          onClick={toggleColorMode}
          aria-label={colorModeLabel}>
          <Box as={colorModeIcon} />
        </Button>
        <Button
          py={2}
          minW="unset"
          height="unset"
          variant="unstyled"
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to Top">
          <Box as={ChevronUp} />
        </Button>
      </Stack>
    </Box>
  );
};
