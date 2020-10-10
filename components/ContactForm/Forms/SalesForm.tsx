import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { Flex } from '@chakra-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import 'yup-phone';
import { requiredMsg, invalidMsg } from 'site/util';
import { FieldGroup, TextInput, TextArea, SelectField } from '../Fields';
import { useFormState } from '../state';

import type { ISalesFormFields, IForm, FormHandlers } from './types';

export const SalesForm = forwardRef<FormHandlers, IForm>((props, ref) => {
  const { onSubmit, accent } = props;
  const { formPlaceholders } = useFormState();

  const {
    firstName,
    lastName,
    companyName,
    emailAddress,
    phoneNumber,
    details,
    interests,
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
    phoneNumber: yup.string().label(phoneNumber).typeError(invalidMsg),
    companyName: yup.string().label(companyName).required(requiredMsg),
    interests: yup.array(yup.string()),
    details: yup.string().label(details),
  });

  const form = useForm<ISalesFormFields>({ resolver: yupResolver(formSchema) });
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
          <TextInput ctl={control} id="firstName" placeholder={firstName} required />
          <TextInput ctl={control} id="lastName" placeholder={lastName} required />
          <TextInput ctl={control} id="companyName" placeholder={companyName} />
        </FieldGroup>
        <FieldGroup>
          <TextInput ctl={control} id="emailAddress" placeholder={emailAddress} required />
          <TextInput ctl={control} id="phoneNumber" placeholder={phoneNumber} />
        </FieldGroup>

        <FieldGroup>
          <SelectField
            id="interests"
            placeholder={interests}
            multi
            menuPortalTarget={document.body}
            width="100%"
            colorScheme={accent}
            opts={[
              { value: 'thing1', label: 'Thing 1' },
              { value: 'thing2', label: 'Thing 2' },
              {
                label: 'Group 1',
                options: [
                  { value: 'subthing1-1', label: 'Sub Thing 1-1' },
                  { value: 'subthing1-2', label: 'Sub Thing 1-2' },
                ],
              },
              {
                label: 'Group 2',
                options: [
                  { value: 'subthing2-1', label: 'Sub Thing 2-1' },
                  { value: 'subthing2-2', label: 'Sub Thing 2-2' },
                ],
              },
            ]}
          />
          <TextArea ctl={control} id="details" placeholder={details} required />
        </FieldGroup>
      </FormProvider>
    </Flex>
  );
});
