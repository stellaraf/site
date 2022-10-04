import { useToken } from "@chakra-ui/react";
import { getScale } from "color2k";

import type { UseInterpolatedColorsReturn } from "./types";

export function useInterpolatedColors(start: string, stop: string): UseInterpolatedColorsReturn {
  const startHex = useToken("colors", start);
  const stopHex = useToken("colors", stop);
  return getScale(stopHex, startHex);
}
