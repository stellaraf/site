import {
  Select as ChakraReactSelect,
  CreatableSelect,
  type MultiValue,
  type OnChangeValue,
  Props as ReactSelectProps,
  type SelectInstance,
  type SelectOptionActionMeta,
} from "chakra-react-select";
import { createContext, forwardRef, useContext } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { Option } from "./option";

import { isSingleValue } from "./types";

import type { SelectOptionSingle } from "~/types";
import type { SelectContextProps, SelectProps } from "./types";

const SelectContext = createContext<SelectContextProps>({} as SelectContextProps);
export const useSelectContext = (): SelectContextProps => useContext(SelectContext);

export const Select = forwardRef(
  <Opt extends SelectOptionSingle = SelectOptionSingle, IsMulti extends boolean = boolean>(
    props: SelectProps<Opt, IsMulti>,
    ref: React.Ref<SelectInstance<Opt, IsMulti>>,
  ): JSX.Element => {
    const {
      options,
      isMulti,
      onSelect,
      isError = false,
      colorScheme = "gray",
      creatable = false,
      ...rest
    } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const Component = creatable ? CreatableSelect : ChakraReactSelect;

    return (
      <SelectContext.Provider value={{ isOpen, isError }}>
        <Component<Opt, IsMulti>
          onChange={defaultOnChange}
          onMenuClose={onClose}
          onMenuOpen={onOpen}
          isClearable={true}
          useBasicStyles
          formatCreateLabel={value => `Add "${value}"`}
          options={options}
          colorScheme={colorScheme}
          onCreateOption={value => {
            defaultOnChange(
              { value, label: value } as OnChangeValue<Opt, IsMulti>,
              { action: "select-option" } as SelectOptionActionMeta<Opt>,
            );
          }}
          isMulti={isMulti}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          components={{ Option }}
          ref={ref}
          selectedOptionColorScheme={colorScheme}
          styles={{
            menuPortal: provided => ({ ...provided, zIndex: 100 }),
          }}
          chakraStyles={{
            placeholder: provided => ({
              ...provided,
              _dark: {
                opacity: 0.3,
              },
              color: "inherit",
              opacity: 0.6,
            }),
          }}
          {...rest}
        />
      </SelectContext.Provider>
    );
  },
);
Select.displayName = "Select";
