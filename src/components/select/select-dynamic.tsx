import { AsyncSelect, type SelectInstance } from "chakra-react-select";

import { createContext, forwardRef, useContext } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { DropdownIndicator } from "./indicator-search";
import { Option } from "./option";

import type { SelectOptionSingle } from "~/types";
import type { SelectContextProps, SelectDynamicProps } from "./types";

const SelectContext = createContext<SelectContextProps>({} as SelectContextProps);
export const useSelectDynamicContext = (): SelectContextProps => useContext(SelectContext);

export const SelectDynamic = forwardRef(
  <Opt extends SelectOptionSingle = SelectOptionSingle, IsMulti extends boolean = boolean>(
    props: SelectDynamicProps<Opt, IsMulti>,
    ref: React.Ref<SelectInstance<Opt, IsMulti>>,
  ): JSX.Element => {
    const { isMulti, isError = false, colorScheme = "gray", options, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <SelectContext.Provider value={{ isOpen, isError }}>
        <AsyncSelect<Opt, IsMulti>
          onMenuClose={onClose}
          onMenuOpen={onOpen}
          useBasicStyles
          components={{ Option, DropdownIndicator }}
          isClearable={true}
          colorScheme={colorScheme}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          defaultOptions
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
          cacheOptions
          loadOptions={options}
          isMulti={isMulti}
          ref={ref}
          {...rest}
        />
      </SelectContext.Provider>
    );
  },
);
SelectDynamic.displayName = "SelectDynamic";
