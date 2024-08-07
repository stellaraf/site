import { extendTheme, getToken } from "@chakra-ui/react";
import { readableColorIsBlack } from "color2k";
import { getProperty } from "dot-prop";

type ExtendThemeReturn = ReturnType<typeof extendTheme>;

interface OpposingOptions {
  light?: string;
  dark?: string;
}

export function isDark(theme: ExtendThemeReturn, color: string): boolean {
  if (typeof color === "string" && color.match(/[a-zA-Z]+\.[a-zA-Z0-9]+/g)) {
    color = getProperty(theme, `colors.${color}`);
  }
  let opposingShouldBeDark = true;
  opposingShouldBeDark = readableColorIsBlack(color);

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
