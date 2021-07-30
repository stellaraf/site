import { FormControl, Textarea } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import type { TextareaProps } from '@chakra-ui/react';
import type { FieldValues } from 'react-hook-form';
import type { TTextField, TFormField } from './types';

const Field = <V extends FieldValues>(props: TTextField<V>): JSX.Element => {
  const { field, fieldState, isRequired } = props;
  const { name, ...rest } = field;
  return (
    <FormControl
      id={name}
      isRequired={isRequired}
      isInvalid={typeof fieldState.error !== 'undefined'}
    >
      <Textarea resize="vertical" h={{ base: '10rem', lg: 'unset' }} {...rest} />
    </FormControl>
  );
};

export const TextArea = <V extends FieldValues>(
  props: TFormField<TextareaProps, V>,
): JSX.Element => {
  const { ctl, id, defaultValue, isRequired = false, ...rest } = props;
  return (
    <Controller<V>
      name={id}
      control={ctl}
      defaultValue={defaultValue}
      rules={{ required: isRequired }}
      render={r => <Field<V> isRequired={isRequired} {...r} {...rest} />}
    />
  );
};
