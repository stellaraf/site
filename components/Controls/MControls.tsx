import { HStack, Box, Button } from '@chakra-ui/react';
import { MdWbSunny as Sun } from '@meronex/icons/md';
import { BsMoon as Moon } from '@meronex/icons/bs';
import { useColorMode, useColorValue } from 'site/context';
import type { IMControls } from './types';

export const MControls = (props: IMControls) => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorValue(Moon, Sun);
  const switchTo = useColorValue('Dark', 'Light');
  const colorModeLabel = `Switch to ${switchTo} Mode`;
  return (
    <HStack {...props}>
      <Button
        py={2}
        minW="unset"
        height="unset"
        variant="unstyled"
        title={colorModeLabel}
        onClick={toggleColorMode}
        aria-label={colorModeLabel}>
        <Box as={colorModeIcon} size={32} />
      </Button>
    </HStack>
  );
};
