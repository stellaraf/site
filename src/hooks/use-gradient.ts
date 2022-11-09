import { useToken } from "@chakra-ui/react";
import { parseToRgba } from "color2k";

import { useColorValue } from "~/context";

import type { BoxProps } from "@chakra-ui/react";

type UseGradientReturn = Pick<BoxProps, "background" | "backgroundColor">;

export function useGradient(direction = 180): UseGradientReturn {
  const primary = useToken("colors", "primary.500");
  const dark = useToken("colors", "dark.500");
  const light = useToken("colors", "light.500");

  const rgbaPrimary = parseToRgba(primary).join(", ");
  const rgbaDark = parseToRgba(dark).join(", ");

  const darkValue = {
    background: `linear-gradient(${direction}deg, rgba(${rgbaPrimary}) 0%, rgba(${rgbaDark}) 100%)`,
  };
  const lightValue = { backgroundColor: light };
  return useColorValue(lightValue, darkValue);
}
