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

export const SupportForm = forwardRef<FormHandlers, IForm<'Support'>>((props, ref) => {
  const { onSubmit } = props;
  const ctx = useFormState();
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    companyName,
    subject,
    details,
  } = ctx.form.Support.get();

  const formSchema = yup.object().shape({
    firstName: yup.string().label(firstName.displayName).required(requiredMsg),
    lastName: yup.string().label(lastName.displayName).required(requiredMsg),
    emailAddress: yup
      .string()
      .label(emailAddress.displayName)
      .email()
      .required(requiredMsg)
      .typeError(invalidMsg),
    phoneNumber: yup.string().label(phoneNumber.displayName).phone().typeError(invalidMsg),
    companyName: yup.string().label(companyName.displayName).required(requiredMsg),
    details: yup
      .string()
      .label(details.displayName)
      .required('Please tell us how we can help you.'),
  });

  const form = useForm<ISupportFormFields>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, control } = form;
  const submitter = handleSubmit(onSubmit);

  useImperativeHandle(ref, () => ({
    submit() {
      submitter();
    },
  }));

  return (
    <Flex as="form" onSubmit={submitter} flexDir="column" w={{ base: '100%', lg: '75%' }}>
      <FormProvider {...form}>
        <FieldGroup>
          <TextInput
            ctl={control}
            id={firstName.id}
            placeholder={firstName.displayName}
            required={firstName.required}
          />
          <TextInput
            ctl={control}
            id={lastName.id}
            placeholder={lastName.displayName}
            required={firstName.required}
          />
          <TextInput
            ctl={control}
            id={companyName.id}
            placeholder={companyName.displayName}
            required={companyName.required}
          />
        </FieldGroup>
        <FieldGroup>
          <TextInput
            ctl={control}
            id={emailAddress.id}
            placeholder={emailAddress.displayName}
            required={emailAddress.required}
          />
          <TextInput
            ctl={control}
            id={phoneNumber.id}
            placeholder={phoneNumber.displayName}
            required={phoneNumber.required}
          />
        </FieldGroup>
        <FieldGroup>
          <TextInput
            ctl={control}
            id={subject.id}
            placeholder={subject.displayName}
            required={subject.required}
          />
        </FieldGroup>
        <FieldGroup>
          <TextArea
            ctl={control}
            id={details.id}
            placeholder={details.displayName}
            required={details.required}
          />
        </FieldGroup>
      </FormProvider>
    </Flex>
  );
});
