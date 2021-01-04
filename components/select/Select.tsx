import { useMemo, useState } from 'react';
import { chakra } from '@chakra-ui/react';
import ReactSelect from 'react-select';
import { useColorMode } from '~/context';
import { IndicatorIcon } from './IndicatorIcon';
import { ClearIcon } from './ClearIcon';
import { SelectProvider } from './context';
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

import type { ISelect, TSelectOption, ISelectContext } from './types';

const ChakraReactSelect = chakra(ReactSelect);

export const Select: React.FC<ISelect> = (props: ISelect) => {
  const { ctl, options, multi, onSelect, colorScheme = 'gray', ...rest } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  const selectContext = useMemo<ISelectContext>(() => ({ colorScheme, colorMode, isOpen }), [
    colorScheme,
    colorMode,
    isOpen,
  ]);

  function handleChange(changed: TSelectOption | TSelectOption[]) {
    if (!Array.isArray(changed)) {
      changed = [changed];
    }
    if (typeof onSelect === 'function') {
      onSelect(changed);
    }
  }

  const multiValue = useMultiValueStyle({ colorMode, colorScheme });
  const multiValueLabel = useMultiValueLabelStyle({ colorMode, colorScheme });
  const multiValueRemove = useMultiValueRemoveStyle({ colorMode, colorScheme });
  const menuPortal = useMenuPortal({ colorMode, colorScheme });
  const rsTheme = useRSTheme({ colorMode, colorScheme });

  return (
    <SelectProvider value={selectContext}>
      <ChakraReactSelect
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
          menuPortal,
          multiValue,
          multiValueLabel,
          multiValueRemove,
          menu: useMenuStyle,
          option: useOptionStyle,
          control: useControlStyle,
          menuList: useMenuListStyle,
          placeholder: usePlaceholderStyle,
          indicatorSeparator: useIndicatorSeparatorStyle,
        }}
        {...rest}
      />
    </SelectProvider>
  );
};
