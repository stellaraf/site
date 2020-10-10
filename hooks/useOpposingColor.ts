import { useState } from 'react';
import { getColor, isLight } from '@chakra-ui/theme-tools';
import { useTheme } from 'site/context';

interface IOpposingOptions {
  light: string;
  dark: string;
}

export function useOpposingColor(color: string, options?: IOpposingOptions): string {
  const theme = useTheme();
  let dark = theme.colors.original.dark;
  let light = theme.colors.original.light;

  if (typeof options !== 'undefined') {
    dark = options.dark;
    light = options.light;
  }

  if (typeof color === 'string' && color.match(/[a-zA-Z]+\.[a-zA-Z0-9]+/g)) {
    color = getColor(theme, color, color);
  }

  let isBlack = true;
  try {
    isBlack = isLight(color)(theme);
  } catch (err) {
    console.error(err);
  }

  const [opposingColor, setOpposingColor] = useState<string>('inherit');

  isBlack && opposingColor !== dark && setOpposingColor(dark);
  !isBlack && opposingColor !== light && setOpposingColor(light);
  return opposingColor;
}
