import { useToken, useColorModeValue } from "@chakra-ui/react";

/**
 * Get a color token value based on color-mode.
 */
export const useColorTokenValue = (light: string, dark: string) =>
  useColorModeValue(useToken("colors", light), useToken("colors", dark));
