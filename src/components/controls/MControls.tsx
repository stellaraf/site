import dynamic from 'next/dynamic';
import { HStack, Box, Button } from '@chakra-ui/react';
import { useColorMode, useColorValue } from '~/context';
import type { IMControls } from './types';

const Sun = dynamic<MeronexIcon>(() => import('@meronex/icons/md').then(i => i.MdWbSunny));
const Moon = dynamic<MeronexIcon>(() => import('@meronex/icons/bs').then(i => i.BsMoon));

export const MControls: React.FC<IMControls> = (props: IMControls) => {
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
        aria-label={colorModeLabel}
      >
        <Box as={colorModeIcon} size={32} />
      </Button>
    </HStack>
  );
};
