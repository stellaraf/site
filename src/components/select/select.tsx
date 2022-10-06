import { createContext, forwardRef, useContext } from "react";
import ReactSelect from "react-select";
import { useDisclosure, useColorMode } from "@chakra-ui/react";
import { Option } from "./option";
import {
  useRSTheme,
  useMenuStyle,
  useMenuPortal,
  useOptionStyle,
  useControlStyle,
  useMenuListStyle,
  useMultiValueStyle,
  usePlaceholderStyle,
  useMultiValueLabelStyle,
  useMultiValueRemoveStyle,
  useIndicatorSeparatorStyle,
} from "./styles";
import { isSingleValue } from "./types";

import type {
  Props as ReactSelectProps,
  MultiValue,
  OnChangeValue,
  SelectInstance,
} from "react-select";
import type { SelectOptionSingle } from "~/types";
import type { SelectProps, SelectContextProps } from "./types";

const SelectContext = createContext<SelectContextProps>({} as SelectContextProps);
export const useSelectContext = (): SelectContextProps => useContext(SelectContext);

export const Select = forwardRef(
  <Opt extends SelectOptionSingle = SelectOptionSingle, IsMulti extends boolean = boolean>(
    props: SelectProps<Opt, IsMulti>,
    ref: React.Ref<SelectInstance<Opt, IsMulti>>,
  ): JSX.Element => {
    const { options, isMulti, onSelect, isError = false, colorScheme = "gray", ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { colorMode } = useColorMode();

    const defaultOnChange: ReactSelectProps<Opt, IsMulti>["onChange"] = changed => {
      if (changed === null) {
        changed = [] as unknown as OnChangeValue<Opt, IsMulti>;
      }
      if (isSingleValue<Opt>(changed)) {
        changed = [changed] as unknown as OnChangeValue<Opt, IsMulti>;
      }
      if (typeof onSelect === "function") {
        onSelect(changed as MultiValue<Opt>);
      }
    };

    const menu = useMenuStyle<Opt, IsMulti>({ colorMode, colorScheme });
    const menuList = useMenuListStyle<Opt, IsMulti>({ colorMode, colorScheme });
    const control = useControlStyle<Opt, IsMulti>({ colorMode, colorScheme });
    const option = useOptionStyle<Opt, IsMulti>({ colorMode, colorScheme });
    const multiValue = useMultiValueStyle<Opt, IsMulti>({
      colorMode,
      colorScheme,
    });
    const multiValueLabel = useMultiValueLabelStyle<Opt, IsMulti>({
      colorMode,
      colorScheme,
    });
    const multiValueRemove = useMultiValueRemoveStyle<Opt, IsMulti>({
      colorMode,
      colorScheme,
    });
    const menuPortal = useMenuPortal<Opt, IsMulti>();
    const placeholder = usePlaceholderStyle<Opt, IsMulti>({
      colorMode,
      colorScheme,
    });
    const indicatorSeparator = useIndicatorSeparatorStyle<Opt, IsMulti>({
      colorMode,
      colorScheme,
    });
    const rsTheme = useRSTheme();

    return (
      <SelectContext.Provider value={{ isOpen, isError }}>
        <ReactSelect<Opt, IsMulti>
          onChange={defaultOnChange}
          onMenuClose={onClose}
          onMenuOpen={onOpen}
          isClearable={true}
          options={options}
          isMulti={isMulti}
          theme={rsTheme}
          components={{ Option }}
          ref={ref}
          styles={{
            menu,
            option,
            control,
            menuList,
            menuPortal,
            multiValue,
            placeholder,
            multiValueLabel,
            multiValueRemove,
            indicatorSeparator,
          }}
          {...rest}
        />
      </SelectContext.Provider>
    );
  },
);
Select.displayName = "Select";
