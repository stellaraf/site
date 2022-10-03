import type {
  Props as IReactSelect,
  ControlProps,
  MenuProps,
  MenuListComponentProps,
  OptionProps,
  MultiValueProps,
  IndicatorProps,
  Theme,
  PlaceholderProps,
} from 'react-select';

import type { BoxProps } from '@chakra-ui/react';
import type { ColorNames } from '~/types';

export interface ISelectState {
  [k: string]: string[];
}

export type TSelectOption = {
  label: string;
  value: string;
};

export type TSelectOptionGroup = {
  label: string;
  options: TSelectOption[];
};

export type TOptions = Array<TSelectOptionGroup | TSelectOption>;

export interface ISelect
  extends Omit<IReactSelect, 'isMulti' | 'onSelect' | 'onChange'>,
    Omit<BoxProps, 'onChange' | 'onSelect'> {
  options: TOptions;
  name: string;
  required?: boolean;
  multi?: boolean;
  onSelect?: (v: TSelectOption[]) => void;
  onChange?: (c: TSelectOption | TSelectOption[]) => void;
  colorScheme?: ColorNames;
}

export interface ISelectContext {
  colorScheme: ColorNames;
  colorMode: 'light' | 'dark';
  isOpen: boolean;
}

export interface MultiValueRemoveProps {
  children: Node;
  data: unknown;
  innerProps: {
    className: string;
    onTouchEnd: (e: unknown) => void;
    onClick: (e: unknown) => void;
    onMouseDown: (e: unknown) => void;
  };
  selectProps: unknown;
}

export interface RSTheme extends Omit<Theme, 'borderRadius'> {
  borderRadius: string | number;
}

export type IControl = ControlProps<TOptions, false>;

export type IMenu = MenuProps<TOptions, false>;

export type IMenuList = MenuListComponentProps<TOptions, false>;

export type IOption = OptionProps<TOptions, false>;

export type IMultiValue = MultiValueProps<TOptions>;

export interface IIndicator extends IndicatorProps<TOptions, false> {}

export type IPlaceholder = PlaceholderProps<TOptions, false>;

export type TSelectContextCallback = Pick<ISelectContext, 'colorMode' | 'colorScheme'>;

export type RSStyleValue<B, S> = (base: B, state: S) => B;
export type RSStyleCallback<B, S> = (base: TSelectContextCallback) => RSStyleValue<B, S>;
export type RSThemeCallback<T> = (base: TSelectContextCallback) => (t: T) => T;

export type { Styles as IStyles } from 'react-select';
