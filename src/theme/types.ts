import type { Open_Sans } from "next/font/google";

import type { Theme as DefaultTheme } from "@chakra-ui/theme";
import type { Palette } from "palette-by-numbers";

export type NextFont = ReturnType<typeof Open_Sans>;

type ExtraColors = {
  primary: Palette;
  secondary: Palette;
  tertiary: Palette;
  dark: Palette;
  light: Palette;
  blackSolid: Palette;
  whiteSolid: Palette;
};

export type InitialTheme = { [key in ChangeableColorNames]: string };

type ChangeableThemeColors = Omit<
  DefaultTheme["colors"],
  "transparent" | "current" | "black" | "white"
>;

type ChangeableColorNames = keyof (ChangeableThemeColors & ExtraColors);

export type ChangeableColors = { [k in ChangeableColorNames]: Palette };

export type CustomColors = DefaultTheme["colors"] & ExtraColors;

export type ColorNames = keyof (DefaultTheme["colors"] & ExtraColors);

export interface CustomTheme extends Omit<DefaultTheme, "colors"> {
  colors: CustomColors;
}

export type FontWeights = DefaultTheme["fontWeights"];

interface Colors {
  [k: string]: string;
}

export interface ThemeConfig {
  colors: Colors;
}
