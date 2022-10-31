import { extendTheme } from "@chakra-ui/react";
import { generatePalette, generateFontFamily, Palette } from "palette-by-numbers";

import { button } from "~/styles";

import { entries } from "../generic";

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
import { opposingColor } from "./opposing-color";

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

const globalStyles = {
  [zIndexKeys]: {
    zIndex: 1,
  },
  html: { scrollBehavior: "smooth" },
  body: {
    bg: "body-bg",
    color: "body-fg",
    fontFamily: "body",
    "*::selection": { backgroundColor: "text-selection-bg", color: "black" },
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
};

function importFonts(userFonts: Omit<Fonts, "themeName">): [ThemeFonts, FontWeights] {
  const { body: userBody, monospace: userMono, ...fontWeights } = userFonts;
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
  const colors = importColors(userTheme.colors as InitialTheme);

  const globalColors = (Object.keys(colors) as StringKeyOf<CustomColors>[]).reduce<
    Record<string, Record<string, string>>
  >((final, name) => {
    if (typeof final[":root[data-theme=light],:root[data-theme=light]"] === "undefined") {
      final[":root[data-theme=light],:root[data-theme=light]"] = {};
    }
    if (typeof final[":root[data-theme=dark]"] === "undefined") {
      final[":root[data-theme=dark]"] = {};
    }

    final[":root[data-theme=light],:root[data-theme=light]"][`--${name}`] = colors[name][500];
    final[":root[data-theme=dark]"][`--${name}`] = colors[name][300];
    final[":root"] = {};
    final[":root"]["--chakra-colors-white"] = colors.white;
    final[":root"]["--chakra-colors-black"] = colors.black;
    return final;
  }, {});

  const tokenColors = (Object.keys(colors) as StringKeyOf<CustomColors>[]).reduce<
    Record<StringKeyOf<CustomColors>, Record<string, string>>
  >((final, name) => {
    final[name] = { _default: colors[name][500], _dark: colors[name][300] };
    return final;
  }, {} as Record<StringKeyOf<CustomColors>, Record<string, string>>);

  const theme = extendTheme({ colors });

  const opposingColors = Object.entries(colors).reduce((final, [colorName, color]) => {
    if (typeof color !== "string") {
      const newColors = Object.fromEntries(
        Object.entries(color).map(([n, v]) => [
          `${colorName}.${n}.opposing`,
          opposingColor(theme, v),
        ]),
      );
      final = { ...final, ...newColors };
    }
    return final;
  }, {});

  const customTheme = extendTheme({
    colors: { ...colors, ...opposingColors },
    fonts,
    fontWeights,
    fontSizes,
    radii,
    styles: { global: { ...globalStyles, ...globalColors } },
    components: { Button: button, Heading: { sizes: headingOverrides } },
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
        ...tokenColors,
      },
    },
    config: { useSystemColorMode: true },
  }) as CustomTheme;
  return customTheme;
};
