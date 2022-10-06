import { useCallback } from "react";
import { useToken } from "@chakra-ui/react";
import { getScale } from "color2k";

import type { ChakraProps } from "@chakra-ui/react";

interface UseGlowOptions {
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
type Start = string;

/**
 * Last or outer-most color.
 */
type Stop = string;

type UseGlowReturn = Required<Pick<ChakraProps, "backgroundColor" | "boxShadow">>;

/**
 * Generate boxShadow & starting backgroundColor for a glow effect between two colors.
 */
export function useGlow(start: Start, stop: Stop, options?: UseGlowOptions): UseGlowReturn {
  const { shadows = 4, increment = 20 } = options ?? {};

  // Get real colors from Chakra UI theme tokens.
  const startHex = useToken("colors", start);
  const stopHex = useToken("colors", stop);

  // Create an array of numbers from 0 through `shadows`.
  const shadowsArray = Array.from({ length: shadows }, (_, i) => i);

  /**
   * Get the color for step `index`.
   */
  const getColor = useCallback(
    (index: number): string => getScale(stopHex, startHex)((1 / shadows) * index),
    [startHex, stopHex, shadows],
  );

  /**
   * Generate a boxShadow string based on the shadow's position.
   */
  const createShadow = useCallback(
    (index: number): string => {
      const px = `${increment * (index + 1)}px`;
      const color = getColor(index);
      return `0 0 ${px} ${px} ${color}`;
    },
    [increment],
  );

  const boxShadow = shadowsArray.map(createShadow).join(", ");
  const backgroundColor = getColor(0);

  return { boxShadow, backgroundColor };
}
