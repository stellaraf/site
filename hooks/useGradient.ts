import { useColorValue } from 'site/context';

import type { BoxProps } from '@chakra-ui/core';

const DARK = {
  background:
    'linear-gradient(180deg, rgba(43, 60, 143, 1) 0%, rgba(42, 23, 74, 1) 50%, rgba(22, 19, 24, 1) 100%)',
};
const LIGHT = { backgroundColor: 'original.light' };

export const useGradient = (): Pick<BoxProps, 'background' | 'backgroundColor'> =>
  useColorValue(LIGHT, DARK);
