import * as React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import { Box } from '@chakra-ui/core';
import { useTheme, useColorMode } from 'site/context';
import { IndicatorIcon } from './IndicatorIcon';
import { ClearIcon } from './ClearIcon';
import {
  useControlStyle,
  useIndicatorSeparatorStyle,
  useMenuListStyle,
  useMenuPortal,
  useMenuStyle,
  useMultiValueLabelStyle,
  useMultiValueRemoveStyle,
  useMultiValueStyle,
  useOptionStyle,
  usePlaceholderStyle,
  useRSTheme,
} from './styles';

import type { ISelect, ISelectOption, ISelectContext } from './types';

const SelectContext = createContext<ISelectContext>(Object());
export const useSelectContext = () => useContext(SelectContext);

export const Select = (props: ISelect) => {
  const { ctl, options, multi, onSelect, colorScheme = 'gray', ...rest } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const selectContext = useMemo<ISelectContext>(() => ({ colorScheme, theme, colorMode, isOpen }), [
    colorScheme,
    colorMode,
    isOpen,
  ]);

  const handleChange = (changed: ISelectOption | ISelectOption[]) => {
    if (!Array.isArray(changed)) {
      changed = [changed];
    }
    if (typeof onSelect === 'function') {
      onSelect(changed);
    }
  };
  const multiValue = useMultiValueStyle({ theme, colorMode, colorScheme });
  const multiValueLabel = useMultiValueLabelStyle({ theme, colorMode, colorScheme });
  const multiValueRemove = useMultiValueRemoveStyle({ theme, colorMode, colorScheme });
  const menuPortal = useMenuPortal({ theme, colorMode, colorScheme });
  const rsTheme = useRSTheme({ theme, colorMode, colorScheme });
  return (
    <SelectContext.Provider value={selectContext}>
      <Box
        as={ReactSelect}
        options={options}
        isMulti={multi}
        onChange={handleChange}
        ref={ctl}
        onMenuClose={() => {
          isOpen && setIsOpen(false);
        }}
        onMenuOpen={() => {
          !isOpen && setIsOpen(true);
        }}
        theme={rsTheme}
        components={{ DropdownIndicator: IndicatorIcon, ClearIndicator: ClearIcon }}
        styles={{
          control: useControlStyle,
          indicatorSeparator: useIndicatorSeparatorStyle,
          menu: useMenuStyle,
          menuList: useMenuListStyle,
          menuPortal,
          multiValue,
          multiValueLabel,
          multiValueRemove,
          option: useOptionStyle,
          placeholder: usePlaceholderStyle,
        }}
        {...rest}
      />
    </SelectContext.Provider>
  );
};
