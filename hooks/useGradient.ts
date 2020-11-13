import { parseToRgba } from 'color2k';
import { useColorValue, useTheme } from 'site/context';

import type { BoxProps } from '@chakra-ui/react';

export const useGradient = (
  direction: number = 180,
): Pick<BoxProps, 'background' | 'backgroundColor'> => {
  const theme = useTheme();
  const { primary, dark, secondary, light, tertiary } = theme.colors.original;
  const rgbaPrimary = parseToRgba(primary).join(', ');
  const rgbaSecondary = parseToRgba(secondary).join(', ');
  const rgbaDark = parseToRgba(dark).join(', ');
  // const darkValue = {
  //   background: `linear-gradient(180deg, rgba(${rgbaPrimary}) 0%, rgba(${rgbaSecondary}) 50%, rgba(${rgbaDark}) 100%)`,
  // };
  const darkValue = {
    background: `linear-gradient(${direction}deg, rgba(${rgbaPrimary}) 0%, rgba(${rgbaDark}) 100%)`,
  };
  const lightValue = { backgroundColor: light };
  return useColorValue(lightValue, darkValue);
};
