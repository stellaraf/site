import * as React from 'react';
import { Box, Button, Stack, useStyles } from '@chakra-ui/core';
import Sun from '@meronex/icons/md/MdWbSunny';
import ChevronUp from '@meronex/icons/bs/BsChevronUp';
import Moon from '@meronex/icons/bs/BsMoon';
import { useColorMode, useColorValue } from 'site/context';

const scrollToTop = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.document.activeElement.blur();
};

export const Controls = props => {
  const { toggleColorMode } = useColorMode();
  const styles = useStyles();
  const colorModeIcon = useColorValue(Moon, Sun);
  const switchTo = useColorValue('Dark', 'Light');
  const colorModeLabel = `Switch to ${switchTo} Mode`;
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
      sx={styles.controls}
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
          <Box as={colorModeIcon} />
        </Button>
        <Button
          py={2}
          onClick={scrollToTop}
          variant="unstyled"
          minW="unset"
          h="unset"
          aria-label="Scroll to Top"
          title="Scroll to Top">
          <Box as={ChevronUp} />
        </Button>
      </Stack>
    </Box>
  );
};
