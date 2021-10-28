import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Portal } from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { isSelectFieldOption } from '~/types';
import { useFieldValues } from '../state';

import type { MenuProps, ButtonProps } from '@chakra-ui/react';
import type { SelectField as SelectFieldT, SelectFieldOption, DeepEntryMembers } from '~/types';

interface SelectFieldProps extends Omit<MenuProps, 'children'> {
  id: string;
  product: string;
  field: DeepEntryMembers<SelectFieldT>;
  buttonProps?: ButtonProps;
}

export const SelectField = (props: SelectFieldProps): JSX.Element => {
  const { id, product, field, buttonProps = {}, size, ...rest } = props;
  const [, setValue] = useFieldValues<string>(product, id, '');
  const [display, setDisplay] = useState(field.name);

  function handleChange(option: SelectFieldOption) {
    setValue(option.productCode);
    setDisplay(option.name);
  }

  function handleReset() {
    setValue('');
    setDisplay(field.name);
  }

  const options = field.options
    .filter(opt => isSelectFieldOption(opt.fields))
    .map(opt => opt.fields) as SelectFieldOption[];

  return (
    <Menu size={size} {...rest}>
      <MenuButton
        as={Button}
        size={size}
        rightIcon={<DynamicIcon icon={{ fa: 'ChevronDown' }} />}
        {...buttonProps}
      >
        {display}
      </MenuButton>
      <Portal>
        <MenuList fontSize={size}>
          <MenuItem key="None" onClick={() => handleReset()}>
            None
          </MenuItem>
          {options.map(opt => (
            <MenuItem key={opt.name} onClick={() => handleChange(opt)}>
              {opt.name}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};
