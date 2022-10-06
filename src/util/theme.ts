import { extendTheme } from "@chakra-ui/react";
import { mode, getColor } from "@chakra-ui/theme-tools";
import { generatePalette, generateFontFamily, Palette } from "palette-by-numbers";

import { heroButtons } from "~/styles";

import { entries } from "./generic";

import type { GlobalStyleProps } from "@chakra-ui/theme-tools";
import type {
  Fonts,
  ThemeFonts,
  CustomTheme,
  FontWeights,
  ThemeConfig,
  CustomColors,
  ChangeableColors,
  InitialTheme,
} from "~/types";

export { isDark, isLight } from "@chakra-ui/theme-tools";

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

const themeColorKeys = [
  "secondary",
  "tertiary",
  "primary",
  "orange",
  "yellow",
  "purple",
  "green",
  "light",
  "gray",
  "teal",
  "blue",
  "cyan",
  "pink",
  "dark",
  "red",
];

const globalStyles = (props: GlobalStyleProps) => {
  const zIndexKeys = [
    "button",
    "label",
    "table",
    "tbody",
    "thead",
    "span",
    "ol",
    "ul",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "td",
    "th",
    "a",
    "p",
  ].join(", ");
  return {
    [zIndexKeys]: {
      zIndex: 1,
    },
    html: { scrollBehavior: "smooth" },
    body: {
      backgroundColor: mode("light.500", "dark.500")(props),
      color: mode("dark.500", "light.500")(props),
      fontFamily: "body",
      "*::selection": mode(
        { backgroundColor: "secondary.200", color: "black" },
        { backgroundColor: "tertiary.100", color: "black" },
      )(props),
    },
    // See https://github.com/rcbyr/keen-slider/blob/master/src/keen-slider.scss
    ".__slider_container": {
      "&[data-keen-slider-v]": {
        flexWrap: "wrap",
      },
      "&[data-keen-slider-v] &__slider_slide": {
        width: "100%",
      },
      "&[data-keen-slider-moves] *": {
        pointerEvents: "none",
      },
    },
    ":root": Object.assign(
      {},
      ...themeColorKeys.map(c => ({
        [`--${c}`]: mode(
          getColor(props.theme, `${c}.500`),
          getColor(props.theme, `${c}.300`),
        )(props),
      })),
    ),
  };
};

function importFonts(userFonts: Omit<Fonts, "themeName">): [ThemeFonts, FontWeights] {
  const { body: userBody, mono: userMono, ...fontWeights } = userFonts;
  const body = generateFontFamily("sans-serif", userBody);
  const mono = generateFontFamily("monospace", userMono);
  return [
    {
      body,
      heading: body,
      mono,
    },
    fontWeights,
  ];
}

function importColors(userColors: InitialTheme): CustomColors {
  const generatedColors = {} as ChangeableColors;
  for (const [key, value] of entries<InitialTheme>(userColors)) {
    generatedColors[key] = generatePalette(value);
  }
  generatedColors.blackSolid = {
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
  } as Palette;
  generatedColors.whiteSolid = {
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
  } as Palette;

  return {
    ...generatedColors,
    black: "#000000",
    white: "#ffffff",
    transparent: "transparent",
    current: "currentColor",
  };
}

const headingOverrides = {
  "4xl": {
    lineHeight: 1,
  },
  "3xl": {
    lineHeight: 1,
  },
  "2xl": {
    lineHeight: [1.5, null, 1],
  },
  xl: {
    lineHeight: [1.5, null, 1.5],
  },
  lg: {
    lineHeight: [1.25, null, 1.25],
  },
  md: { lineHeight: 1.25 },
  sm: { lineHeight: 1 },
  xs: { lineHeight: 1 },
};

export const makeTheme = (userTheme: ThemeConfig): CustomTheme => {
  const [fonts, fontWeights] = importFonts(userTheme.fonts);
  const defaultTheme = extendTheme({
    colors: importColors(userTheme.colors as InitialTheme),
    fonts,
    fontWeights,
    fontSizes,
    radii,
    styles: { global: globalStyles },
    components: { Button: heroButtons, Heading: { sizes: headingOverrides } },
  });
  return defaultTheme as CustomTheme;
};
