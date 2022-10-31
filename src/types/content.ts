export type ThemeColorValues =
  | "primary"
  | "secondary"
  | "tertiary"
  | "light"
  | "dark"
  | "red"
  | "green"
  | "pink"
  | "blue"
  | "purple"
  | "cyan"
  | "teal"
  | "orange"
  | "yellow"
  | "gray";

type Colors = {
  themeName: string;
  [k: string]: string;
};

export interface Fonts {
  themeName: string;
  body: string;
  monospace: string;
  hairline: number;
  thin: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export type ThemeConfig = {
  colors: Omit<Colors, "themeName">;
  fonts: Omit<Fonts, "themeName">;
};
