import { useMemo } from 'react';
export const heroBtn1Variant = { dark: 'light', light: 'primary' };

export const headerBg = { dark: 'transparent', light: 'original.light' };
export const sect1BtnText = { dark: 'original.light', light: 'original.dark' };

export const gradient = {
  dark: {
    background:
      'linear-gradient(180deg, rgba(43, 60, 143, 1) 0%, rgba(42, 23, 74, 1) 50%, rgba(22, 19, 24, 1) 100%)',
  },
  light: { backgroundColor: 'original.light' },
};

export const commonDark = {
  btnBorder: undefined,
  btnVariant: 'solid',
  btnHoverBg: 'whiteAlpha.500',
  border: { borderBottomColor: 'original.tertiary', borderBottomWidth: '1px' },
};

export const commonLight = {
  btnVariant: 'outline',
  btnBorder: 'black',
  btnHoverBg: 'blackAlpha.50',
  border: {},
};

export const variants = [
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
      otherProps: { pt: '320px' },
    },
    light: {
      bg: 'original.light',
      text: 'original.dark',
      btnText: 'original.dark',
      ...commonLight,
      otherProps: { pt: '320px' },
    },
  },
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
    },
    light: {
      bg: 'original.tertiary',
      text: 'original.dark',
      btnText: 'original.dark',
      ...commonLight,
    },
  },
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
    },
    light: {
      bg: 'original.primary',
      text: 'original.light',
      btnText: 'original.light',
      ...commonLight,
      btnBorder: 'original.light',
      btnHoverBg: 'whiteAlpha.50',
    },
  },
  {
    dark: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonDark,
    },
    light: {
      bg: 'original.dark',
      text: 'original.light',
      btnText: 'original.light',
      ...commonLight,
      btnBorder: 'original.light',
    },
  },
];

const getVariant = (idx, colorMode) => {
  return variants[idx][colorMode];
};

export const useSectionStyle = (index: number, colorMode: 'light' | 'dark') => {
  const idx = index % variants.length;
  return useMemo(() => getVariant(idx, colorMode), [idx, colorMode]);
};
