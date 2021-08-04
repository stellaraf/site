import { mode } from '@chakra-ui/theme-tools';

import type { StyleObjectOrFn } from '@chakra-ui/react';

const variantBase = (props: Dict): StyleObjectOrFn => ({
  header: mode({}, { borderBottomWidth: 0 })(props),
  box: mode(
    {},
    {
      borderBottomColor: 'tertiary.500',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
    },
  )(props),
  button: mode(
    {
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
        borderColor: 'tertiary.500',
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

const variantZed = (props: Dict): StyleObjectOrFn => ({
  button: {},
  header: mode({}, { bg: 'transparent', backdropFilter: 'blur(5px)' })(props),
  box: mode(
    {
      bg: 'light.500',
      color: 'dark.500',
    },
    {
      bg: 'dark.500',
      color: 'light.500',
    },
  )(props),
  link: mode(
    { _hover: { color: 'blackAlpha.600' }, activeColor: 'blackAlpha.300' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'tertiary.500',
    },
  )(props),
});

const variantOne = (props: Dict): StyleObjectOrFn => ({
  button: mode(
    {
      border: '1px',
      backgroundColor: 'transparent',
      borderColor: 'dark.500',
      _hover: { backgroundColor: 'blackAlpha.50', borderColor: 'dark.500' },
    },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'tertiary.500',
      color: 'dark.500',
    },
    {
      bg: 'dark.500',
      color: 'light.500',
    },
  )(props),

  link: mode(
    { _hover: { color: 'blackAlpha.700' }, activeColor: 'blackAlpha.300' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'tertiary.500',
    },
  )(props),
});

const variantTwo = (props: Dict): StyleObjectOrFn => ({
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
      bg: 'primary.500',
      color: 'light.500',
    },
    {
      bg: 'dark.500',
      color: 'light.500',
    },
  )(props),
  link: mode(
    { _hover: { color: 'primary.200' }, activeColor: 'primary.400' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'tertiary.500',
    },
  )(props),
});

const variantThree = (props: Dict): StyleObjectOrFn => ({
  button: mode(
    { backgroundColor: 'whiteAlpha.200', _hover: { backgroundColor: 'whiteAlpha.300' } },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'dark.500',
      color: 'light.500',
    },
    {
      bg: 'dark.500',
      color: 'light.500',
    },
  )(props),
  link: mode(
    { _hover: { color: 'whiteAlpha.100' }, activeColor: 'whiteAlpha.200' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'tertiary.500',
    },
  )(props),
});

const variantFour = (props: Dict): StyleObjectOrFn => ({
  button: mode(
    {
      backgroundColor: 'light.500',
      color: 'secondary.500',
      _hover: {
        backgroundColor: 'whiteAlpha.100',
        color: 'light.500',
        borderColor: 'light.500',
      },
    },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'secondary.500',
      color: 'light.500',
    },
    {
      bg: 'dark.500',
      color: 'light.500',
    },
  )(props),
  link: mode(
    { _hover: { color: 'whiteAlpha.100' }, activeColor: 'whiteAlpha.200' },
    {
      _hover: { color: 'light.200' },
      activeColor: 'tertiary.500',
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
    4: variantFour,
  },
  defaultProps: {
    variant: 0,
  },
};
