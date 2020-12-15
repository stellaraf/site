import type { Theme as DefaultTheme } from '@chakra-ui/theme';
import type { ColorHues } from '@chakra-ui/theme/dist/types/foundations/colors';

type ExtraColors = {
  primary: ColorHues;
  secondary: ColorHues;
  tertiary: ColorHues;
  dark: ColorHues;
  light: ColorHues;
  blackSolid: ColorHues;
  whiteSolid: ColorHues;
};

export type InitialTheme = { [key in ColorNames]: string };

export type ChangeableColors = DefaultTheme['colors'] & ExtraColors;

export type CustomColors = DefaultTheme['colors'] & DefaultTheme['colors'] & ExtraColors;

export type ColorNames = keyof (DefaultTheme['colors'] & ExtraColors);

export interface CustomTheme extends Omit<DefaultTheme, 'colors'> {
  colors: CustomColors;
}

export interface ThemeFonts {
  body: string;
  heading: string;
  mono: string;
}

export type { Fonts as ConfigFonts } from './content';

export type FontWeights = DefaultTheme['fontWeights'];

export type { Styles } from '@chakra-ui/theme-tools';
