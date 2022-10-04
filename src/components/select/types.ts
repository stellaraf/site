import * as ReactSelect from 'react-select';

import type { StylesProps, StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import type { SelectOptionSingle, ColorNames } from '~/types';

export type SelectOnChange<
  Opt extends SelectOptionSingle = SelectOptionSingle,
  IsMulti extends boolean = boolean
> = NonNullable<PropOf<ReactSelect.Props<Opt, IsMulti>, 'onChange'>>;

export interface SelectProps<Opt extends SelectOptionSingle, IsMulti extends boolean = false>
  extends ReactSelect.Props<Opt, IsMulti> {
  name: string;
  isMulti?: IsMulti;
  isError?: boolean;
  required?: boolean;
  onSelect?: (s: ReactSelect.MultiValue<Opt>) => void;
  colorScheme?: ColorNames;
}

export interface SelectContextProps {
  isOpen: boolean;
  isError: boolean;
}

export interface RSStyleCallbackProps {
  colorMode: 'light' | 'dark';
  colorScheme: ColorNames;
}

type StyleConfigKeys = keyof ReactSelect.StylesConfig<
  SelectOptionSingle,
  boolean,
  ReactSelect.GroupBase<SelectOptionSingle>
>;

export type RSStyleFunction<
  K extends StyleConfigKeys,
  Opt extends SelectOptionSingle,
  IsMulti extends boolean
> = StylesConfigFunction<StylesProps<Opt, IsMulti, ReactSelect.GroupBase<Opt>>[K]>;

export type RSThemeFunction = (theme: ReactSelect.Theme) => ReactSelect.Theme;

export function isSingleValue<Opt extends SelectOptionSingle>(
  value: ReactSelect.SingleValue<Opt> | ReactSelect.MultiValue<Opt>,
): value is NonNullable<ReactSelect.SingleValue<Opt>> {
  return value !== null && !Array.isArray(value);
}

export function isMultiValue<Opt extends SelectOptionSingle>(
  value: ReactSelect.SingleValue<Opt> | ReactSelect.MultiValue<Opt>,
): value is NonNullable<ReactSelect.MultiValue<Opt>> {
  return value !== null && Array.isArray(value);
}
