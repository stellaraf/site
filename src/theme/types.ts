import type { Theme as DefaultTheme } from "@chakra-ui/theme";
import type { NextFont } from "@next/font";
import type { Palette } from "palette-by-numbers";

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

export type ThemeFonts = DefaultTheme["fonts"];

export type FontWeights = DefaultTheme["fontWeights"];

interface Colors {
  [k: string]: string;
}

export interface Fonts {
  body: NextFont;
  heading: NextFont;
  monospace: NextFont;
}

export interface ThemeConfig {
  colors: Colors;
}
