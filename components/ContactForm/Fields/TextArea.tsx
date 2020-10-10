import * as React from 'react';
import { FormControl, Icon, Input, InputGroup, InputRightElement, Textarea } from '@chakra-ui/core';
import { FaCheckCircle as Check, FaTimesCircle as Error } from '@meronex/icons/fa';
import { Controller, useFormContext } from 'react-hook-form';

import type { ITextAreaField, ITextArea } from './types';

const Field = (props: ITextAreaField) => {
  const { name, required = false, ...rest } = props;
  const { formState } = useFormContext();
  const { isSubmitting, isSubmitSuccessful, errors } = formState;
  return (
    <FormControl id={name} isInvalid={errors?.[name]} isRequired={required}>
      <Textarea resize="vertical" h={{ base: '10rem', lg: 'unset' }} {...rest} />
    </FormControl>
  );
};

export const TextArea = (props: ITextArea) => {
  const { ctl, id, ...rest } = props;
  return <Controller as={Field} control={ctl} name={id} defaultValue="" {...rest} />;
};
