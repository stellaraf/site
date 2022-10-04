import { useToken } from "@chakra-ui/react";
import { getScale } from "color2k";

import type { UseGlow } from "./types";

/**
 * Generate boxShadow & starting backgroundColor for a glow effect between two colors.
 */
export function useGlow(
  start: UseGlow.Start,
  stop: UseGlow.Stop,
  options?: UseGlow.Options,
): UseGlow.Return {
  const { shadows = 4, increment = 20 } = options ?? {};

  // Get real colors from Chakra UI theme tokens.
  const startHex = useToken("colors", start);
  const stopHex = useToken("colors", stop);

  // Create an array of numbers from 0 through `shadows`.
  const shadowsArray = Array.from({ length: shadows }, (_, i) => i);

  /**
   * Get the color for step `index`.
   */
  function getColor(index: number): string {
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
  function createShadow(index: number): string {
    const px = `${increment * (index + 1)}px`;
    const color = getColor(index);
    return `0 0 ${px} ${px} ${color}`;
  }

  const boxShadow = shadowsArray.map(createShadow).join(", ");
  const backgroundColor = getColor(0);

  return { boxShadow, backgroundColor };
}
