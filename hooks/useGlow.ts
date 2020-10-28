import { useToken } from '@chakra-ui/core';
import { getScale } from 'color2k';

import type { ChakraProps } from '@chakra-ui/core';

interface IGlowOptions {
  /**
   * Number of shadows.
   */
  shadows?: number;
  /**
   * Pixels for each shadow.
   */
  increment?: number;
}

/**
 * First or inner-most color.
 */
type TStart = string;

/**
 * Last or outer-most color.
 */
type TStop = string;

interface IUseGlowReturn {
  /**
   * Background Color as string.
   */
  backgroundColor: ChakraProps['backgroundColor'];
  /**
   * Box Shadow as string.
   */
  boxShadow: ChakraProps['boxShadow'];
}

/**
 * Generate boxShadow & starting backgroundColor for a glow effect between two colors.
 */
export function useGlow(start: TStart, stop: TStop, options?: IGlowOptions): IUseGlowReturn {
  const { shadows = 4, increment = 20 } = options ?? {};

  // Get real colors from Chakra UI theme tokens.
  const startHex = useToken('colors', start);
  const stopHex = useToken('colors', stop);

  // Create an array of numbers from 0 through `shadows`.
  const shadowsArray = Array.from({ length: shadows }, (_, i) => i);

  /**
   * Get the color for step `index`.
   */
  function getColor(index: number) {
    /**
     * `getScale()` returns a callback that takes a number between 0 and 1 as its argument. This
     * number is the percentage between start (0) and end (1) that should be interpolated based on
     * the color range.
     */
    return getScale(stopHex, startHex)((1 / shadows) * index);
  }
  /**
   * Generate a boxShadow string based on the shadow's position.
   */
  function createShadow(index: number) {
    const px = `${increment * (index + 1)}px`;
    const color = getColor(index);
    return `0 0 ${px} ${px} ${color}`;
  }

  const boxShadow = shadowsArray.map(createShadow).join(', ');
  const backgroundColor = getColor(0);

  return { boxShadow, backgroundColor };
}
