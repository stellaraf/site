import { useCallback, useMemo } from 'react';
import { mergeWith } from '@chakra-ui/utils';
import { useColorValue, useColorTokenValue, useToken } from '~/context';
import { useOpposingColor, useMobile } from '~/hooks';
import { useSelectContext } from './context';

import type {
  IMenu,
  IOption,
  IStyles,
  RSTheme,
  IControl,
  IMenuList,
  IIndicator,
  IMultiValue,
  RSStyleValue,
  IPlaceholder,
  RSStyleCallback,
  RSThemeCallback,
} from './types';

export const useControlStyle: RSStyleValue<IStyles, IControl> = (base, state) => {
  const { isFocused } = state;

  const focusBorder = useColorTokenValue('blue.500', 'blue.300');
  const border = useColorTokenValue('gray.200', 'whiteAlpha.200');
  const borderHover = useColorTokenValue('gray.300', 'whiteAlpha.400');
  const invalidBorder = useColorTokenValue('red.500', 'red.300');

  const styles = {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: useToken('space', 2),
    border: `1px solid ${isFocused ? focusBorder : border}`,
    backgroundColor: 'inherit',
    borderRadius: useToken('radii', 'md'),
    minHeight: useToken('sizes', 10),
    transition: 'all 0.2s',
    boxShadow: isFocused ? `0 0 0 1px ${focusBorder}` : 'none',
    '&:hover > div > span': { backgroundColor: borderHover },
    '&:hover .__rs-icon': { color: borderHover },
    '&:hover': { borderColor: isFocused ? focusBorder : borderHover },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
    '&:focus': {
      borderColor: focusBorder,
      boxShadow: `0 0 0 1px ${focusBorder}`,
      zIndex: 'unset',
    },
    '&.invalid': { borderColor: invalidBorder, boxShadow: `0 0 0 1px ${invalidBorder}` },
  };
  return useMemo(() => mergeWith({}, base, styles), [focusBorder, isFocused]);
};

export const useMenuStyle: RSStyleValue<IStyles, IMenu> = base => {
  const { isOpen } = useSelectContext();
  const backgroundColor = useColorTokenValue('white', 'blackAlpha.600');
  const shadowSize = useColorValue('sm', 'dark-lg');
  const boxShadow = useToken('shadows', shadowSize);
  const backdropFilter = useColorValue(undefined, 'blur(4px');

  const styles = {
    boxShadow,
    top: '100%',
    width: '100%',
    backdropFilter,
    backgroundColor,
    borderWidth: '1px',
    position: 'absolute',
    paddingTop: useToken('space', 2),
    minWidth: useToken('sizes', '3xs'),
    paddingBottom: useToken('space', 2),
    borderRadius: useToken('radii', 'md'),
    transition: 'background 50ms ease-in 0s',
  };

  return useMemo(() => mergeWith({}, base, styles), [backgroundColor, isOpen]);
};

export const useMenuListStyle: RSStyleValue<IStyles, IMenuList> = base => {
  const { isOpen } = useSelectContext();

  const scrollBg = useColorTokenValue('blackAlpha.50', 'whiteAlpha.50');
  const scrollHover = useColorTokenValue('blackAlpha.400', 'whiteAlpha.400');
  const scrollColor = useColorTokenValue('blackAlpha.300', 'whiteAlpha.300');

  const styles = {
    overflowY: 'auto',
    position: 'relative',
    maxHeight: useToken('sizes', 'xs'),
    '&::-webkit-scrollbar': { width: '5px' },
    '&::-webkit-scrollbar-track': { backgroundColor: scrollBg },
    '&::-webkit-scrollbar-thumb': { backgroundColor: scrollColor },
    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: scrollHover },
    '-ms-overflow-style': { display: 'none' },
  };

  return useMemo(() => mergeWith({}, base, styles), [scrollBg, isOpen]);
};

export const useOptionStyle: RSStyleValue<IStyles, IOption> = (base, state) => {
  const { isFocused } = state;
  const { colorScheme, isOpen } = useSelectContext();

  const focusedBg = useColorTokenValue('blackAlpha.100', 'whiteAlpha.100');
  const hoverBg = useColorTokenValue(`${colorScheme}.100`, `${colorScheme}.200`);
  const activeBg = useColorTokenValue(`${colorScheme}.500`, `${colorScheme}.300`);
  const hoverColor = useOpposingColor(hoverBg);
  const activeColor = useOpposingColor(activeBg);

  const styles = {
    backgroundColor: isFocused ? focusedBg : 'transparent',
    color: 'inherit',
    transition: 'background 50ms ease-in 0s',
    paddingTop: useToken('space', 2),
    paddingBottom: useToken('space', 2),
    paddingLeft: useToken('space', 4),
    paddingRight: useToken('space', 4),
    width: '100%',
    userSelect: 'none',
    cursor: 'default',
    '&:hover': { backgroundColor: hoverBg, color: hoverColor },
    '&:focus': { backgroundColor: activeBg, color: activeColor },
    '&:active': { backgroundColor: activeBg, color: activeColor },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  };

  return useMemo(() => mergeWith({}, base, styles), [focusedBg, isFocused, isOpen]);
};

export const useIndicatorSeparatorStyle: RSStyleValue<IStyles, IIndicator> = base => {
  const border = useColorTokenValue('gray.200', 'whiteAlpha.200');
  const styles = { backgroundColor: border, transition: 'all 0.2s' };
  return useMemo(() => mergeWith({}, base, styles), [border]);
};

export const usePlaceholderStyle: RSStyleValue<IStyles, IPlaceholder> = base => {
  const color = useColorTokenValue('gray.400', 'whiteAlpha.400');
  return useMemo(() => mergeWith({}, base, { color }), [color]);
};

export const useMultiValueStyle: RSStyleCallback<IStyles, IMultiValue> = props => {
  const { colorScheme } = props;

  const backgroundColor = useColorTokenValue(`${colorScheme}.500`, `${colorScheme}.300`);
  const boxShadowLight = useToken('shadows', 'md');
  const boxShadow = useColorValue(boxShadowLight, undefined);
  const color = useOpposingColor(backgroundColor);

  const styles = {
    backgroundColor,
    fontWeight: useToken('fontWeights', 'medium'),
    boxShadow,
    color: color,
    borderRadius: useToken('radii', 'md'),
    margin: '0.2rem',
  };

  return useCallback((base: IStyles) => mergeWith({}, base, styles), [backgroundColor, color]);
};

export const useMultiValueLabelStyle: RSStyleCallback<IStyles, IMultiValue> = props => {
  const { colorMode, colorScheme } = props;

  const styles = {
    fontSize: '85%',
    color: 'inherit',
    whiteSpace: 'nowrap',
    borderRadius: 'unset',
    textOverflow: 'ellipsis',
    padding: useToken('space', 1),
    paddingLeft: useToken('space', 2),
  };

  return useCallback((base: IStyles) => mergeWith({}, base, styles), [colorMode, colorScheme]);
};

export const useMultiValueRemoveStyle: RSStyleCallback<IStyles, IMultiValue> = props => {
  const { colorMode } = props;

  const styles = {
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingRight: useToken('space', 2),
    transition: 'opacity 50ms ease-in 0s',
    borderTopRightRadius: useToken('radii', 'md'),
    borderBottomRightRadius: useToken('radii', 'md'),
    '&:hover': { backgroundColor: 'unset', color: 'unset', opacity: 0.7 },
  };
  return useCallback((base: IStyles) => mergeWith({}, base, styles), [colorMode]);
};

export const useMenuPortal: RSStyleCallback<IStyles, IMultiValue> = () => {
  const isMobile = useMobile();
  const styles = {
    zIndex: isMobile ? 1500 : 1,
  };
  return useCallback((base: IStyles) => mergeWith({}, base, styles), [isMobile]);
};

export const useRSTheme: RSThemeCallback<RSTheme> = () => {
  const borderRadius = useToken('radii', 'md');
  return useCallback((t: RSTheme): RSTheme => ({ ...t, borderRadius }), []);
};
