import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import type { ITextField, ITextInput } from './types';

const Field: React.FC<ITextField> = (props: ITextField) => {
  const { name, required = false, ...rest } = props;
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <FormControl id={name} isInvalid={errors?.[name]} isRequired={required}>
      <Input {...rest} />
      <FormErrorMessage>{errors?.[name] && errors[name].message}</FormErrorMessage>
    </FormControl>
  );
};

export const TextInput: React.FC<ITextInput> = (props: ITextInput) => {
  const { ctl, id, ...rest } = props;
  return <Controller as={Field} control={ctl} name={id} defaultValue="" {...rest} />;
};
