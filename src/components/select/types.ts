import * as ReactSelect from "react-select";

import type {
  AsyncProps,
  GroupBase as ChakraGroupBase,
  OptionsOrGroups as ChakraOptionsOrGroups,
  MultiValue,
  Props,
} from "chakra-react-select";
import type { StylesConfig } from "react-select";
import type { ColorNames } from "~/theme";
import type { SelectOptionSingle } from "~/types";

export type SelectOnChange<
  Opt extends SelectOptionSingle = SelectOptionSingle,
  IsMulti extends boolean = boolean,
> = NonNullable<PropOf<ReactSelect.Props<Opt, IsMulti>, "onChange">>;

// export interface SelectProps<Opt extends SelectOptionSingle, IsMulti extends boolean = boolean>
//   extends Omit<ReactSelect.Props<Opt, IsMulti>, ReactSelectExcluded>,
//     ChakraProps {
//   name: string;
//   isMulti?: IsMulti;
//   isError?: boolean;
//   required?: boolean;
//   onSelect?: (s: ReactSelect.MultiValue<Opt>) => void;
//   colorScheme?: ColorNames;
// }

export interface SelectProps<Opt extends SelectOptionSingle, IsMulti extends boolean = boolean>
  extends Props<Opt, IsMulti> {
  name: string;
  isMulti?: IsMulti;
  isError?: boolean;
  creatable?: boolean;
  required?: boolean;
  onSelect?: (s: MultiValue<Opt>) => void;
  colorScheme?: ColorNames;
}

export interface SelectDynamicProps<
  Opt extends SelectOptionSingle,
  IsMulti extends boolean = boolean,
> extends Omit<AsyncProps<Opt, IsMulti, ChakraGroupBase<Opt>>, "options"> {
  options: (search: string) => Promise<ChakraOptionsOrGroups<Opt, ChakraGroupBase<Opt>>>;
  name: string;
  isMulti?: IsMulti;
  isError?: boolean;
  required?: boolean;
  colorScheme?: ColorNames;
}

export interface SelectContextProps {
  isOpen: boolean;
  isError: boolean;
}

export interface RSStyleCallbackProps {
  colorMode: "light" | "dark";
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
  IsMulti extends boolean,
> = NonNullable<StylesConfig<Opt, IsMulti, ReactSelect.GroupBase<Opt>>[K]>;

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
