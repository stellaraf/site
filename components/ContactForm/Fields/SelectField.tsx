import * as React from 'react';
import { useEffect } from 'react';
import { FormControl, FormErrorMessage } from '@chakra-ui/core';
import { useFormContext } from 'react-hook-form';
import { Select as CustomSelect } from 'site/components';

import type { ISelectOption } from 'site/components';
import type { ISelectField } from './types';

export const SelectField = (props: ISelectField) => {
  const { opts, id: name, required = false, multi, onSelect: _, ...rest } = props;
  const { formState, setValue, register } = useFormContext();
  const { errors } = formState;
  errors?.[name] && console.table(errors);
  const handleSelect = (values: ISelectOption[]): void => {
    const labels = [];
    for (let v of values) {
      if (v?.label) {
        labels.push(v.label);
      }
    }
    setValue(name, labels);
  };
  useEffect(() => {
    register(name);
  }, [register]);

  return (
    <FormControl id={name} isInvalid={errors?.[name]} isRequired={required}>
      <CustomSelect
        name={name}
        required={required}
        options={opts}
        multi={multi}
        onSelect={handleSelect}
        defaultValue={[]}
        {...rest}
      />
      <FormErrorMessage children={errors?.[name] && errors[name].message} />
    </FormControl>
  );
};
