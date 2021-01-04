import { FormControl, Textarea } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import type { ITextAreaField, ITextArea } from './types';

const Field = (props: ITextAreaField) => {
  const { name, required = false, ...rest } = props;
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <FormControl id={name} isInvalid={errors?.[name]} isRequired={required}>
      <Textarea resize="vertical" h={{ base: '10rem', lg: 'unset' }} {...rest} />
    </FormControl>
  );
};

export const TextArea: React.FC<ITextArea> = (props: ITextArea) => {
  const { ctl, id, ...rest } = props;
  return <Controller as={Field} control={ctl} name={id} defaultValue="" {...rest} />;
};
