import type { Theme as DefaultTheme } from '@chakra-ui/theme';
import type { ColorHues } from '@chakra-ui/theme/dist/types/foundations/colors';

export interface DefaultColors {
  transparent: string;
  current: string;
  black: string;
  white: string;
  whiteAlpha: ColorHues;
  blackAlpha: ColorHues;
  gray: ColorHues;
  red: ColorHues;
  orange: ColorHues;
  yellow: ColorHues;
  green: ColorHues;
  teal: ColorHues;
  blue: ColorHues;
  cyan: ColorHues;
  purple: ColorHues;
  pink: ColorHues;
  linkedin: ColorHues;
  facebook: ColorHues;
  messenger: ColorHues;
  whatsapp: ColorHues;
  twitter: ColorHues;
  telegram: ColorHues;
}

export interface ThemeColors {
  primary: ColorHues;
  secondary: ColorHues;
  tertiary: ColorHues;
  dark: ColorHues;
  light: ColorHues;
  original: { [key: string]: string };
}

export interface Breakpoints {
  [n: number]: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export type CustomColors = DefaultColors & ThemeColors;

export type ColorNames = keyof CustomColors;

export interface CustomTheme extends Omit<DefaultTheme, 'colors' | 'breakpoints'> {
  colors: CustomColors;
  breakpoints: Breakpoints;
}

export interface ThemeFonts {
  body: string;
  heading: string;
  mono: string;
}

export type { Fonts as ConfigFonts } from './content';

export type FontWeights = DefaultTheme['fontWeights'];

export type { Styles } from '@chakra-ui/theme-tools';
