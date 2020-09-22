import { createState, useState } from '@hookstate/core';
import { mode } from '@chakra-ui/theme-tools';

import type { Dict } from 'site/types';

const variantBase = (props: Dict) => ({
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

const variantZed = (props: Dict) => ({
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

const variantOne = (props: Dict) => ({
  button: mode(
    {
      border: '1px',
      backgroundColor: 'transparent',
      borderColor: 'original.dark',
      _hover: { backgroundColor: 'blackAlpha.50', borderColor: 'original.dark' },
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

const variantTwo = (props: Dict) => ({
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

const variantThree = (props: Dict) => ({
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

const variantFour = (props: Dict) => ({
  button: mode(
    {
      backgroundColor: 'original.light',
      color: 'original.secondary',
      _hover: {
        backgroundColor: 'whiteAlpha.100',
        color: 'original.light',
        borderColor: 'original.light',
      },
    },
    {},
  )(props),
  header: mode({}, {})(props),
  box: mode(
    {
      bg: 'original.secondary',
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
    4: variantFour,
  },
  defaultProps: {
    variant: 0,
  },
};

const syncedStyleVariant = createState(0);
export const useSyncedStyleVariant = () => useState(syncedStyleVariant);
