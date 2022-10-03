import { HStack, Button } from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useColorMode, useColorValue } from '~/context';

import type { IMControls } from './types';

export const MControls: React.FC<IMControls> = (props: IMControls) => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorValue({ bs: 'BsMoon' }, { md: 'MdWbSunny' });
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
        aria-label={colorModeLabel}
      >
        <DynamicIcon icon={colorModeIcon} boxSize={32} />
      </Button>
    </HStack>
  );
};
