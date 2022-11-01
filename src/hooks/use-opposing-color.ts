import { useMemo } from "react";

import { useTheme } from "~/context";
import { opposingColor, isDark } from "~/theme";

export function useColorWhenDark(color: string, whenDark: string, fallback: string): string {
  const theme = useTheme();
  return useMemo(() => {
    const dark = isDark(theme, color);
    return dark ? whenDark : fallback;
  }, [color]);
}

export function useOpposingColor(color: string): string {
  const theme = useTheme();
  return useMemo(() => opposingColor(theme, color), [color]);
}
