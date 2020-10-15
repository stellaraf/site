import * as React from 'react';
import { FormControl, FormErrorMessage, Input, InputGroup } from '@chakra-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

import type { ITextField, ITextInput } from './types';

const Field = (props: ITextField) => {
  const { name, required = false, ...rest } = props;
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <FormControl id={name} isInvalid={errors?.[name]} isRequired={required}>
      <Input {...rest} />
      <FormErrorMessage children={errors?.[name] && errors[name].message} />
    </FormControl>
  );
};

export const TextInput = (props: ITextInput) => {
  const { ctl, id, ...rest } = props;
  return <Controller as={Field} control={ctl} name={id} defaultValue="" {...rest} />;
};
