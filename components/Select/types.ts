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
import type { BoxProps } from '@chakra-ui/core';
import type { ColorNames, CustomTheme } from 'site/types';

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

export type TBoxAsReactSelect = Omit<IReactSelect, 'isMulti' | 'onSelect' | 'onChange'> &
  Omit<BoxProps, 'onChange' | 'onSelect'>;

export interface ISelect extends TBoxAsReactSelect {
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
  theme: CustomTheme;
  colorMode: 'light' | 'dark';
  isOpen: boolean;
}

export interface MultiValueRemoveProps {
  children: Node;
  data: any;
  innerProps: {
    className: string;
    onTouchEnd: (e: any) => void;
    onClick: (e: any) => void;
    onMouseDown: (e: any) => void;
  };
  selectProps: any;
}

export interface RSTheme extends Omit<Theme, 'borderRadius'> {
  borderRadius: string | number;
}

export type IControl = ControlProps<TOptions>;

export type IMenu = MenuProps<TOptions>;

export type IMenuList = MenuListComponentProps<TOptions>;

export type IOption = OptionProps<TOptions>;

export type IMultiValue = MultiValueProps<TOptions>;

export type IIndicator = IndicatorProps<TOptions>;

export type IPlaceholder = PlaceholderProps<TOptions>;

export type TMultiValue = Pick<ISelectContext, 'theme' | 'colorMode' | 'colorScheme'>;

export type { Styles as IStyles } from 'react-select';
