import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { Flex } from '@chakra-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import 'yup-phone';
import { requiredMsg, invalidMsg } from 'site/util';
import { FieldGroup, TextInput, TextArea } from '../Fields';
import { useFormState } from '../state';

import type { ISupportFormFields, IForm, FormHandlers } from './types';

export const SupportForm = forwardRef<FormHandlers, IForm>((props, ref) => {
  const { formPlaceholders } = useFormState();
  const {
    firstName,
    lastName,
    companyName,
    emailAddress,
    phoneNumber,
    details,
  } = formPlaceholders.get();

  const formSchema = yup.object().shape({
    firstName: yup.string().label(firstName).required(requiredMsg),
    lastName: yup.string().label(lastName).required(requiredMsg),
    emailAddress: yup
      .string()
      .label(emailAddress)
      .email()
      .required(requiredMsg)
      .typeError(invalidMsg),
    phoneNumber: yup.string().label(phoneNumber).phone().typeError(invalidMsg),
    companyName: yup.string().label(companyName).required(requiredMsg),
    details: yup.string().label(details).required('Please tell us how we can help you.'),
  });

  const form = useForm<ISupportFormFields>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, control } = form;
  const submitter = handleSubmit(props.onSubmit);

  useImperativeHandle(ref, () => ({
    submit() {
      submitter();
    },
  }));

  return (
    <Flex as="form" onSubmit={submitter} flexDir="column" w={{ base: '100%', lg: '75%' }}>
      <FormProvider {...form}>
        <FieldGroup>
          <TextInput ctl={control} id="firstName" placeholder={firstName} required />
          <TextInput ctl={control} id="lastName" placeholder={lastName} required />
          <TextInput ctl={control} id="companyName" placeholder={companyName} />
        </FieldGroup>
        <FieldGroup>
          <TextInput ctl={control} id="emailAddress" placeholder={emailAddress} required />
          <TextInput ctl={control} id="phoneNumber" placeholder={phoneNumber} />
        </FieldGroup>
        <FieldGroup>
          <TextArea ctl={control} id="details" placeholder={details} required />
        </FieldGroup>
      </FormProvider>
    </Flex>
  );
});
