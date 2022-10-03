import { Box, Button, VStack } from '@chakra-ui/react';
import { MdWbSunny as Sun } from '@meronex/icons/md';
import { BsMoon as Moon } from '@meronex/icons/bs';
import { BsChevronUp as ChevronUp } from '@meronex/icons/bs';
import { useColorMode, useColorValue } from '~/context';

import type { IDControls } from './types';

/**
 * SSR-safely smooth-scroll to the top of the viewport.
 */
function scrollToTop(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.document.activeElement instanceof HTMLElement) {
    window.document.activeElement.blur();
  }
}

export const DControls: React.FC<IDControls> = (props: IDControls) => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorValue(Moon, Sun);
  const bg = useColorValue('white', 'blackAlpha.300');
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const hoverColor = useColorValue('secondary.500', 'tertiary.300');
  const switchTo = useColorValue('Dark', 'Light');
  const colorModeLabel = `Switch to ${switchTo} Mode`;
  return (
    <Box
      py={4}
      bg={bg}
      right={0}
      zIndex={5}
      pos="fixed"
      width="2rem"
      height="6rem"
      bottom="25px"
      display="flex"
      boxShadow="md"
      alignItems="center"
      borderTopWidth="1px"
      borderLeftWidth="1px"
      justifyContent="center"
      borderBottomWidth="1px"
      borderTopLeftRadius="lg"
      borderColor={borderColor}
      borderBottomLeftRadius="lg"
      css={{ backdropFilter: 'blur(20px)' }}
      {...props}
    >
      <VStack pos="relative" spacing={6}>
        ?
        <Button
          minW="unset"
          height="unset"
          variant="unstyled"
          title={colorModeLabel}
          onClick={toggleColorMode}
          aria-label={colorModeLabel}
          _hover={{ color: hoverColor }}
        >
          <Box as={colorModeIcon} />
        </Button>
        <Button
          minW="unset"
          height="unset"
          variant="unstyled"
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to Top"
          _hover={{ color: hoverColor }}
        >
          <Box as={ChevronUp} />
        </Button>
      </VStack>
    </Box>
  );
};
