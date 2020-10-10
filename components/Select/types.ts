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
import type { CustomColors, CustomTheme } from 'site/types';

export interface ISelectState {
  [k: string]: string[];
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface ISelectOptionGroup {
  label: string;
  options: ISelectOption[];
}

export type TOptions = Array<ISelectOptionGroup | ISelectOption>;

export interface ISelect extends Omit<IReactSelect, 'isMulti' | 'onSelect'> {
  options: TOptions;
  name: string;
  required?: boolean;
  multi?: boolean;
  onSelect?: (v: ISelectOption[]) => void;
  colorScheme?: keyof CustomColors;
}

export interface ISelectContext {
  colorScheme: keyof CustomColors;
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
