import { createState, useState } from '@hookstate/core';
import { mode } from '@chakra-ui/theme-tools';
import { useColorValue } from 'site/context';

export const heroBtn1Variant = { dark: 'light', light: 'primary' };
export const headerBg = { dark: 'transparent', light: 'original.light' };
export const sect1BtnText = { dark: 'original.light', light: 'original.dark' };

export const useGradient = () =>
  useColorValue(
    { backgroundColor: 'original.light' },
    {
      background:
        'linear-gradient(180deg, rgba(43, 60, 143, 1) 0%, rgba(42, 23, 74, 1) 50%, rgba(22, 19, 24, 1) 100%)',
    },
  );

export const heroButtons = {
  variants: {
    heroPrimary: props =>
      mode(
        {
          bg: 'primary.500',
          color: 'white',
          boxShadow: 'md',
          mx: 4,
          _hover: { bg: 'primary.400' },
        },
        {
          bg: 'teal.400',
          color: 'white',
          boxShadow: 'md',
          mx: 4,
          _hover: { bg: 'teal.300', color: 'white' },
        },
      )(props),
    heroSecondary: props =>
      mode(
        { bg: 'light.50', color: 'black', boxShadow: 'md', mx: 4, _hover: { bg: 'blackAlpha.50' } },
        {
          bg: 'transparent',
          borderColor: 'white',
          borderWidth: '1px',
          boxShadow: 'md',
          mx: 4,
          _hover: { bg: 'whiteAlpha.100' },
        },
      )(props),
  },
};

const variantBase = (props: Record<string, any>) => ({
  button: mode(
    {
      variant: 'solid',
      colorScheme: 'gray',
      _hover: {
        backgroundColor: 'blackAlpha.50',
        borderColor: 'dark.300',
        borderWidth: '1px',
      },
    },
    {
      border: undefined,
      variant: 'solid',
      _hover: {
        backgroundColor: 'whiteAlpha.50',
        borderColor: 'original.tertiary',
        borderWidth: '1px',
      },
    },
  )(props),
  link: {
    p: 4,
    mr: 8,
    pos: 'relative',
    fontWeight: 'medium',
    transition: 'all 0.2s',
    _hover: { textDecoration: 'none', transform: `translateY(-2px)` },
  },
  controls: mode(
    { bg: 'blackAlpha.400', backdropFilter: 'blur(5px)', color: 'white' },
    { bg: 'whiteAlpha.400', backdropFilter: 'blur(5px)', color: 'white' },
  )(props),
});

const variantZed = (props: Record<string, any>) => ({
  button: {},
  header: mode({}, { bg: 'transparent', backdropFilter: 'blur(5px)' })(props),
  box: mode(
    {
      bg: 'original.light',
      color: 'original.dark',
    },
    {
      bg: 'original.dark',
      color: 'original.light',
    },
  )(props),
  link: mode(
    { _hover: { color: 'blackAlpha.600' }, activeColor: 'blackAlpha.300' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
  )(props),
});

const variantOne = (props: Record<string, any>) => ({
  button: mode(
    {
      variant: 'outline',
      backgroundColor: 'transparent',
      borderColor: 'original.dark',
      _hover: { backgroundColor: 'blackAlpha.50' },
    },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'original.tertiary',
      color: 'original.dark',
    },
    {
      bg: 'original.dark',
      color: 'original.light',
    },
  )(props),

  link: mode(
    { _hover: { color: 'blackAlpha.700' }, activeColor: 'blackAlpha.300' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
  )(props),
});

const variantTwo = (props: Record<string, any>) => ({
  button: mode(
    {
      backgroundColor: 'whiteAlpha.200',
      _hover: { backgroundColor: 'whiteAlpha.50', borderColor: 'light.50' },
    },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'original.primary',
      color: 'original.light',
    },
    {
      bg: 'original.dark',
      color: 'original.light',
    },
  )(props),
  link: mode(
    { _hover: { color: 'primary.200' }, activeColor: 'primary.400' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
  )(props),
});

const variantThree = (props: Record<string, any>) => ({
  button: mode(
    { backgroundColor: 'whiteAlpha.200', _hover: { backgroundColor: 'whiteAlpha.300' } },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'original.dark',
      color: 'original.light',
    },
    {
      bg: 'original.dark',
      color: 'original.light',
    },
  )(props),
  link: mode(
    { _hover: { color: 'whiteAlpha.100' }, activeColor: 'whiteAlpha.200' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'original.tertiary',
    },
  )(props),
});

export const syncedStyles = {
  parts: ['button', 'header', 'controls', 'box', 'link'],
  baseStyle: variantBase,
  variants: {
    0: variantZed,
    1: variantOne,
    2: variantTwo,
    3: variantThree,
  },
  defaultProps: {
    variant: 0,
  },
};

const syncedStyleVariant = createState(0);
export const useSyncedStyleVariant = () => useState(syncedStyleVariant);

const headerLogo = createState(false);
export const useHeaderLogo = () => useState(headerLogo);
