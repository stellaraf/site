import { getToken, extendTheme } from "@chakra-ui/react";
import { getColor, isLight } from "@chakra-ui/theme-tools";

type ExtendThemeReturn = ReturnType<typeof extendTheme>;

interface OpposingOptions {
  light?: string;
  dark?: string;
}

export function isDark(theme: ExtendThemeReturn, color: string): boolean {
  if (typeof color === "string" && color.match(/[a-zA-Z]+\.[a-zA-Z0-9]+/g)) {
    color = getColor(theme, color, color);
  }
  let opposingShouldBeDark = true;
  opposingShouldBeDark = isLight(color)(theme);
  try {
  } catch (err) {
    console.error(err);
  }
  return opposingShouldBeDark;
}

export function opposingColor(
  theme: ExtendThemeReturn,
  color: string,
  options?: OpposingOptions,
): string {
  let opposingColor = "inherit";
  const isBlack = isDark(theme, color);

  const dark = getToken("colors", options?.dark ?? "dark.500")(theme);
  const light = getToken("colors", options?.light ?? "light.500")(theme);

  if (isBlack && opposingColor !== dark) {
    opposingColor = dark;
  } else if (!isBlack && opposingColor !== light) {
    opposingColor = light;
  }

  return opposingColor;
}
