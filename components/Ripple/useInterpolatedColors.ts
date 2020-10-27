import { useToken } from '@chakra-ui/core';
import { getScale } from 'color2k';

export function useInterpolatedColors(start: string, stop: string) {
  const startHex = useToken('colors', start);
  const stopHex = useToken('colors', stop);
  return getScale(stopHex, startHex);
}
