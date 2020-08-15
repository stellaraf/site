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

const linkVariants = [
  {
    dark: {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
    light: { _hover: { color: 'blackAlpha.600' }, activeColor: 'blackAlpha.300' },
  },
  {
    dark: {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
    light: { _hover: { color: 'blackAlpha.700' }, activeColor: 'blackAlpha.300' },
  },
  {
    dark: {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
    light: { _hover: { color: 'primary.200' }, activeColor: 'primary.400' },
  },
  {
    dark: {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
    light: { _hover: { color: 'whiteAlpha.100' }, activeColor: 'whiteAlpha.200' },
  },
];

const btnCommonDark = {
  border: undefined,
  variant: 'solid',
  _hover: {
    backgroundColor: 'transparent',
    borderColor: 'original.tertiary',
    borderBottomWidth: '1px',
  },
};

const btnCommonLight = {
  variant: 'solid',
  variantColor: 'gray',
};

export const btnVariants = [
  { dark: { ...btnCommonDark }, light: { ...btnCommonLight } },
  {
    dark: { ...btnCommonDark },
    light: {
      ...btnCommonLight,
      variant: 'outline',
      borderColor: 'original.dark',
      _hover: { backgroundColor: 'blackAlpha.50' },
    },
  },
  {
    dark: { ...btnCommonDark },
    light: {
      ...btnCommonLight,
      variantColor: 'primary',
      _hover: { backgroundColor: 'whiteAlpha.50', borderColor: 'light.50' },
    },
  },
  {
    dark: { ...btnCommonDark },
    light: {
      ...btnCommonLight,
      backgroundColor: 'whiteAlpha.200',
      _hover: { backgroundColor: 'whiteAlpha.300' },
    },
  },
];

export const variants = [
  {
    dark: {
      bg: 'original.dark',
      color: 'original.light',
    },
    light: {
      bg: 'original.light',
      color: 'original.dark',
    },
  },
  {
    dark: {
      bg: 'original.dark',
      color: 'original.light',
    },
    light: {
      bg: 'original.tertiary',
      color: 'original.dark',
    },
  },
  {
    dark: {
      bg: 'original.dark',
      color: 'original.light',
    },
    light: {
      bg: 'original.primary',
      color: 'original.light',
    },
  },
  {
    dark: {
      bg: 'original.dark',
      color: 'original.light',
    },
    light: {
      bg: 'original.dark',
      color: 'original.light',
    },
  },
];

export const useDefaultVariant = colorMode =>
  useMemo(
    () => ({
      bg: { dark: 'transparent', light: 'original.light' }[colorMode],
      color: { dark: 'original.light', light: 'original.dark' }[colorMode],
      buttonStyle: { ...btnVariants[0][colorMode], borderColor: 'transparent' },
      linkStyle: linkVariants[0][colorMode],
    }),
    [colorMode],
  );

const getVariant = (iter, idx, colorMode) => iter[idx][colorMode];

const getStyles = (idx, colorMode) => {
  return {
    ...getVariant(variants, idx, colorMode),
    buttonStyle: getVariant(btnVariants, idx, colorMode),
    linkStyle: getVariant(linkVariants, idx, colorMode),
  };
};

export const useVariantStyle = (index: number, colorMode: 'light' | 'dark') => {
  return useMemo(() => getStyles(index % variants.length, colorMode), [index, colorMode]);
};
