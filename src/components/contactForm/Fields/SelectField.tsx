import { useEffect } from 'react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Select as CustomSelect } from '~/components';

import type { TSelectOption } from '~/components';
import type { ISelectField } from './types';

export const SelectField: React.FC<ISelectField> = (props: ISelectField) => {
  const { opts, id: name, required = false, multi, onSelect: _, ...rest } = props;
  const { formState, setValue, register } = useFormContext();
  const { errors } = formState;

  errors?.[name] && console.table(errors);

  function handleSelect(values: TSelectOption[]): void {
    const labels = [];
    for (const v of values) {
      if (v?.label) {
        labels.push(v.label);
      }
    }
    setValue(name, labels);
  }

  useEffect(() => {
    register(name);
  }, [register]);

  return (
    <FormControl id={name} isInvalid={errors?.[name]} isRequired={required}>
      <CustomSelect
        name={name}
        multi={multi}
        options={opts}
        defaultValue={[]}
        required={required}
        onSelect={handleSelect}
        {...rest}
      />
      <FormErrorMessage>{errors?.[name] && errors[name].message}</FormErrorMessage>
    </FormControl>
  );
};
