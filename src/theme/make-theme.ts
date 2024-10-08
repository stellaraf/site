import { extendTheme } from "@chakra-ui/react";

import { Palette, generatePalette } from "palette-by-numbers";

import { entries } from "~/lib";

import {
  Calendar,
  CalendarControl,
  CalendarDay,
  CalendarMonth,
  button,
  heading,
  menu,
} from "./components";
import { globalStyles } from "./global-css";

import type {
  ChangeableColors,
  CustomColors,
  CustomTheme,
  InitialTheme,
  ThemeConfig,
} from "./types";

const radii = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
  "2xl": "1rem",
  "3xl": "1.25rem",
  "4xl": "1.5rem",
  "5xl": "1.75rem",
  "6xl": "2rem",
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
  "4xl": "4rem",
  "5xl": "5rem",
  "6xl": "6rem",
};

const whiteSolid: Palette = {
  50: "#ffffff",
  100: "#f7f7f7",
  200: "#f0f0f0",
  300: "#e8e8e8",
  400: "#e1e1e1",
  500: "#d9d9d9",
  600: "#d2d2d2",
  700: "#cacaca",
  800: "#c3c3c3",
  900: "#bbbbbb",
};

const blackSolid: Palette = {
  50: "#444444",
  100: "#3c3c3c",
  200: "#353535",
  300: "#2d2d2d",
  400: "#262626",
  500: "#1e1e1e",
  600: "#171717",
  700: "#0f0f0f",
  800: "#080808",
  900: "#000000",
};

function importColors(userColors: InitialTheme): CustomColors {
  const generatedColors = { blackSolid, whiteSolid } as ChangeableColors;
  for (const [key, value] of entries<InitialTheme>(userColors)) {
    generatedColors[key] = generatePalette(value);
  }

  return {
    ...generatedColors,
    black: "#000000",
    white: "#ffffff",
    transparent: "transparent",
    current: "currentColor",
  };
}

export const makeTheme = (userTheme: ThemeConfig): CustomTheme => {
  const colors = importColors(userTheme.colors as InitialTheme);

  const customTheme = extendTheme({
    colors,
    fonts: {
      body: "var(--font-open-sans)",
      heading: "var(--font-open-sans)",
      mono: "var(--font-fira-code)",
    },
    fontSizes,
    radii,
    styles: { global: globalStyles },
    components: {
      Button: button,
      Heading: heading,
      Menu: menu,
      Calendar,
      CalendarControl,
      CalendarDay,
      CalendarMonth,
    },
    layerStyles: {
      container: {
        px: { base: 4, md: 4, lg: 16, xl: 24 },
      },
    },
    semanticTokens: {
      colors: {
        "body-bg": {
          default: "light.500",
          _dark: "dark.500",
        },
        "body-fg": {
          default: "dark.500",
          _dark: "light.500",
        },
        "text-selection-bg": {
          default: "secondary.200",
          _dark: "tertiary.100",
        },
      },
    },
    config: { initialColorMode: "system" },
  }) as CustomTheme;
  return customTheme;
};
