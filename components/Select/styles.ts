import { useCallback, useMemo } from 'react';
import { mergeWith } from '@chakra-ui/utils';
import { useOpposingColor, useMobile } from 'site/hooks';
import { useColorValue } from 'site/context';
import { useSelectContext } from './Select';

import type {
  IControl,
  IIndicator,
  IMenu,
  IMenuList,
  IMultiValue,
  IOption,
  IPlaceholder,
  IStyles,
  RSTheme,
  TMultiValue,
} from './types';

export const useControlStyle = (base: IStyles, state: IControl): IStyles => {
  const { isFocused } = state;
  const { colorMode, theme } = useSelectContext();
  const { colors, radii, sizes, space } = theme;
  const { gray, whiteAlpha, blue, red } = colors;
  const focusBorder = useColorValue(blue[500], blue[300]);
  const border = useColorValue(gray[200], whiteAlpha[200]);
  const borderHover = useColorValue(gray[300], whiteAlpha[400]);
  const invalidBorder = useColorValue(red[500], red[300]);
  const styles = {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: space[2],
    border: `1px solid ${isFocused ? focusBorder : border}`,
    backgroundColor: 'inherit',
    borderRadius: radii.md,
    minHeight: sizes[10],
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
  return useMemo(() => mergeWith({}, base, styles), [colorMode, isFocused]);
};

export const useMenuStyle = (base: IStyles, state: IMenu): IStyles => {
  const { colorMode, theme, isOpen } = useSelectContext();
  const { radii, colors, shadows, sizes, space } = theme;
  const backgroundColor = useColorValue('white', colors.blackAlpha[600]);
  const boxShadow = useColorValue(shadows.sm, shadows['dark-lg']);
  const styles = {
    top: '100%',
    borderRadius: radii.md,
    borderWidth: '1px',
    position: 'absolute',
    width: '100%',
    minWidth: sizes['3xs'],
    paddingTop: space[2],
    paddingBottom: space[2],
    transition: 'background 50ms ease-in 0s',
    backdropFilter: colorMode === 'dark' ? 'blur(4px)' : undefined,
    backgroundColor,
    boxShadow,
  };
  return useMemo(() => mergeWith({}, base, styles), [colorMode, isOpen]);
};

export const useMenuListStyle = (base: IStyles, state: IMenuList): IStyles => {
  const { theme, colorMode, isOpen } = useSelectContext();
  const { whiteAlpha, blackAlpha } = theme.colors;
  const scrollBg = useColorValue(blackAlpha[50], whiteAlpha[50]);
  const scrollHover = useColorValue(blackAlpha[400], whiteAlpha[400]);
  const scrollColor = useColorValue(blackAlpha[300], whiteAlpha[300]);
  const styles = {
    overflowY: 'auto',
    position: 'relative',
    maxHeight: theme.sizes.xs,
    '&::-webkit-scrollbar': { width: '5px' },
    '&::-webkit-scrollbar-track': { backgroundColor: scrollBg },
    '&::-webkit-scrollbar-thumb': { backgroundColor: scrollColor },
    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: scrollHover },
    '-ms-overflow-style': { display: 'none' },
  };
  return useMemo(() => mergeWith({}, base, styles), [colorMode, isOpen]);
};

export const useOptionStyle = (base: IStyles, state: IOption): IStyles => {
  const { isFocused, selectProps } = state;
  const { theme, colorScheme, colorMode, isOpen } = useSelectContext();
  const { colors, space } = theme;
  const focusedBg = useColorValue(colors.blackAlpha[100], colors.whiteAlpha[100]);
  const hoverBg = useColorValue(colors[colorScheme][100], colors[colorScheme][200]);
  const hoverColor = useOpposingColor(hoverBg);
  const activeBg = useColorValue(colors[colorScheme][500], colors[colorScheme][300]);
  const activeColor = useOpposingColor(activeBg);
  const styles = {
    backgroundColor: isFocused ? focusedBg : 'transparent',
    color: 'inherit',
    transition: 'background 50ms ease-in 0s',
    paddingTop: space[2],
    paddingBottom: space[2],
    paddingLeft: space[4],
    paddingRight: space[4],
    width: '100%',
    userSelect: 'none',
    cursor: 'default',
    '&:hover': { backgroundColor: hoverBg, color: hoverColor },
    '&:focus': { backgroundColor: activeBg, color: activeColor },
    '&:active': { backgroundColor: activeBg, color: activeColor },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  };
  return useMemo(() => mergeWith({}, base, styles), [colorMode, isFocused, isOpen]);
};

export const useIndicatorSeparatorStyle = (base: IStyles, state: IIndicator): IStyles => {
  const { theme, colorMode } = useSelectContext();
  const { gray, whiteAlpha } = theme.colors;
  const border = useColorValue(gray[200], whiteAlpha[200]);
  const styles = { backgroundColor: border, transition: 'all 0.2s' };
  return useMemo(() => mergeWith({}, base, styles), [colorMode]);
};

export const usePlaceholderStyle = (base: IStyles, state: IPlaceholder): IStyles => {
  const { theme, colorMode } = useSelectContext();
  const color = useColorValue(theme.colors.gray[400], theme.colors.whiteAlpha[400]);
  return useMemo(() => mergeWith({}, base, { color }), [colorMode]);
};

export const useMultiValueStyle = (props: TMultiValue) => {
  const { theme, colorMode, colorScheme } = props;
  const { colors, radii, shadows, fontWeights } = theme;
  const backgroundColor = useColorValue(colors[colorScheme][500], colors[colorScheme][300]);

  const color = useOpposingColor(backgroundColor);
  const styles = {
    backgroundColor,
    fontWeight: fontWeights.medium,
    boxShadow: colorMode === 'light' ? shadows.md : undefined,
    color: color,
    borderRadius: radii.md,
    margin: '0.2rem',
  };
  return useCallback((base: IStyles, state: IMultiValue) => mergeWith({}, base, styles), [
    backgroundColor,
    color,
  ]);
};

export const useMultiValueLabelStyle = (props: TMultiValue) => {
  const { theme, colorMode, colorScheme } = props;
  const { space } = theme;
  const styles = {
    borderRadius: 'unset',
    color: 'inherit',
    fontSize: '85%',
    textOverflow: 'ellipsis',
    padding: space[1],
    paddingLeft: space[2],
    whiteSpace: 'nowrap',
  };
  return useCallback((base: IStyles, state: IMultiValue) => mergeWith({}, base, styles), [
    colorMode,
    colorScheme,
  ]);
};

export const useMultiValueRemoveStyle = (props: TMultiValue) => {
  const { theme, colorMode, colorScheme } = props;
  const { space, radii } = theme;
  const styles = {
    borderTopRightRadius: radii.md,
    borderBottomRightRadius: radii.md,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingRight: space[2],
    alignItems: 'center',
    transition: 'opacity 50ms ease-in 0s',
    '&:hover': { backgroundColor: 'unset', color: 'unset', opacity: 0.7 },
  };
  return useCallback((base: IStyles, state: IMultiValue) => mergeWith({}, base, styles), [
    colorMode,
    colorScheme,
  ]);
};

export const useRSTheme = (props: TMultiValue) => {
  const { theme } = props;
  return useCallback((t: RSTheme): RSTheme => ({ ...t, borderRadius: theme.radii.md }), []);
};

export const useMenuPortal = (props: TMultiValue) => {
  const isMobile = useMobile();
  const styles = {
    zIndex: isMobile ? 1500 : 1,
  };
  return useCallback((base: IStyles, state: IMultiValue) => mergeWith({}, base, styles), [
    isMobile,
  ]);
};
