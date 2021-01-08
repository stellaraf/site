import {
  hsla,
  saturate,
  desaturate,
  parseToHsla,
  transparentize,
  readableColorIsBlack,
} from 'color2k';
import { extendTheme } from '@chakra-ui/react';
import { mode, getColor } from '@chakra-ui/theme-tools';
import { mergeWith } from '@chakra-ui/utils';
import { syncedStyles, heroButtons } from '~/styles';

import type { GlobalStyleProps } from '@chakra-ui/theme-tools';
import type {
  Fonts,
  ThemeFonts,
  CustomTheme,
  FontWeights,
  ThemeConfig,
  CustomColors,
} from '~/types';

const radii = {
  none: '0',
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
  '2xl': '1rem',
  '3xl': '1.25rem',
  '4xl': '1.5rem',
  '5xl': '1.75rem',
  '6xl': '2rem',
};
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
  '5xl': '5rem',
  '6xl': '6rem',
};

const themeColorKeys = [
  'secondary',
  'tertiary',
  'primary',
  'orange',
  'yellow',
  'purple',
  'green',
  'light',
  'gray',
  'teal',
  'blue',
  'cyan',
  'pink',
  'dark',
  'red',
];

export const isLight = (color: string): boolean => readableColorIsBlack(color);
export const isDark = (color: string): boolean => !readableColorIsBlack(color);

const alphaColors = (color: string) => {
  return {
    50: transparentize(color, Number((1 - 0.04).toFixed(2))),
    100: transparentize(color, Number((1 - 0.08).toFixed(2))),
    200: transparentize(color, Number((1 - 0.12).toFixed(2))),
    300: transparentize(color, Number((1 - 0.16).toFixed(2))),
    400: transparentize(color, Number((1 - 0.24).toFixed(2))),
    500: transparentize(color, Number((1 - 0.38).toFixed(2))),
    600: transparentize(color, Number((1 - 0.48).toFixed(2))),
    700: transparentize(color, Number((1 - 0.6).toFixed(2))),
    800: transparentize(color, Number((1 - 0.8).toFixed(2))),
    900: transparentize(color, Number((1 - 0.92).toFixed(2))),
  };
};

const generateColors = (colorInput: string) => {
  const colorMap = Object();

  const lightnessMap = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];
  const saturationMap = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];

  const colorHsla = parseToHsla(colorInput);
  const lightnessGoal = colorHsla[2];

  const closestLightness = lightnessMap.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal) ? curr : prev,
  );

  const baseColorIndex = lightnessMap.findIndex(l => l === closestLightness);

  const colors = lightnessMap
    .map(l => {
      const [h, s, _, a] = colorHsla;
      return hsla(h, s, l, a);
    })
    .map((color, i) => {
      const saturationDelta = saturationMap[i] - saturationMap[baseColorIndex];
      return saturationDelta >= 0
        ? saturate(color, saturationDelta)
        : desaturate(color, saturationDelta * -1);
    });

  const getColorNumber = (index: number) => (index === 0 ? 50 : index * 100);

  colors.map((color, i) => {
    const colorIndex = getColorNumber(i);
    if (colorIndex === 500) {
      colorMap[500] = colorInput;
    } else {
      colorMap[colorIndex] = color;
    }
  });
  return colorMap;
};

const defaultBodyFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const defaultMonoFonts = [
  'SFMono-Regular',
  'Melno',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  '"Courier New"',
  'monospace',
];

const generatePalette = (palette: ThemeConfig['colors']): CustomColors => {
  const generatedPalette = Object();
  Object.keys(palette).map(color => {
    if (!['black', 'white'].includes(color)) {
      generatedPalette[color] = generateColors(palette[color]);
    } else {
      generatedPalette[color] = palette[color];
      generatedPalette[`${color}Alpha`] = alphaColors(palette[color]);
      generatedPalette.blackSolid = {
        50: '#444444',
        100: '#3c3c3c',
        200: '#353535',
        300: '#2d2d2d',
        400: '#262626',
        500: '#1e1e1e',
        600: '#171717',
        700: '#0f0f0f',
        800: '#080808',
        900: '#000000',
      };
      generatedPalette.whiteSolid = {
        50: '#ffffff',
        100: '#f7f7f7',
        200: '#f0f0f0',
        300: '#e8e8e8',
        400: '#e1e1e1',
        500: '#d9d9d9',
        600: '#d2d2d2',
        700: '#cacaca',
        800: '#c3c3c3',
        900: '#bbbbbb',
      };
    }
  });
  return generatedPalette;
};

const globalStyles = (props: GlobalStyleProps) => {
  const zIndexKeys = [
    'button',
    'label',
    'table',
    'tbody',
    'thead',
    'span',
    'ol',
    'ul',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'td',
    'th',
    'a',
    'p',
  ].join(', ');
  return {
    [zIndexKeys]: {
      zIndex: 1,
    },
    html: { scrollBehavior: 'smooth' },
    body: {
      backgroundColor: mode('light.500', 'dark.500')(props),
      color: mode('dark.500', 'light.500')(props),
      fontFamily: 'body',
      '*::selection': mode(
        { backgroundColor: 'secondary.200', color: 'black' },
        { backgroundColor: 'tertiary.100', color: 'white' },
      )(props),
    },
    // See https://github.com/rcbyr/keen-slider/blob/master/src/keen-slider.scss
    '.__slider_container': {
      '&[data-keen-slider-v]': {
        flexWrap: 'wrap',
      },
      '&[data-keen-slider-v] &__slider_slide': {
        width: '100%',
      },
      '&[data-keen-slider-moves] *': {
        pointerEvents: 'none',
      },
    },
    ':root': Object.assign(
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

const formatFont = (font: string): string => {
  const fontList = font.split(' ');
  const fontFmt = fontList.length >= 2 ? `'${fontList.join(' ')}'` : fontList.join(' ');
  return fontFmt;
};

const importFonts = (userFonts: Omit<Fonts, 'themeName'>): [ThemeFonts, FontWeights] => {
  const [body, mono] = [defaultBodyFonts, defaultMonoFonts];
  const { body: userBody, mono: userMono, ...fontWeights } = userFonts;
  const bodyFmt = formatFont(userBody);
  const monoFmt = formatFont(userMono);
  if (userFonts.body && !body.includes(bodyFmt)) {
    body.unshift(bodyFmt);
  }
  if (userFonts.mono && !mono.includes(monoFmt)) {
    mono.unshift(monoFmt);
  }
  return [
    {
      body: body.join(', '),
      heading: body.join(', '),
      mono: mono.join(', '),
    },
    fontWeights,
  ];
};

const importColors = (userColors: ThemeConfig['colors']): CustomColors => {
  const generatedColors = generatePalette(userColors);

  return {
    ...generatedColors,
    transparent: 'transparent',
    current: 'currentColor',
  };
};

const headingOverrides = {
  '4xl': {
    lineHeight: 1,
  },
  '3xl': {
    lineHeight: 1,
  },
  '2xl': {
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
    colors: importColors(userTheme.colors),
    fonts,
    fontWeights,
    fontSizes,
    radii,
    styles: { global: globalStyles },
    components: { Button: heroButtons, Heading: { sizes: headingOverrides } },
  });
  return mergeWith(defaultTheme, {
    components: { SyncedStyles: syncedStyles },
  });
};
