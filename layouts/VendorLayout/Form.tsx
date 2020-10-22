import { forwardRef, useImperativeHandle } from 'react';
import { useState } from '@hookstate/core';
import { Flex } from '@chakra-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { FieldGroup, TextInput } from 'site/components';
import { requiredMsg, invalidMsg } from 'site/util';
import { useVendor } from './VendorLayout';
import { submitForm } from './submitForm';

import type { IForm, IFormHandlers, IFormDataTrial } from './types';

export const Form = forwardRef<IFormHandlers, IForm>((_, ref) => {
  const { name, vendorForm } = useVendor();

  const vendorFormState = useState(vendorForm);

  const { firstName, lastName, emailAddress, phoneNumber, companyName } = vendorFormState.get();

  const formSchema = yup.object().shape({
    firstName: yup.string().label(firstName.displayName).required(requiredMsg),
    lastName: yup.string().label(lastName.displayName).required(requiredMsg),
    emailAddress: yup
      .string()
      .label(emailAddress.displayName)
      .email()
      .required(requiredMsg)
      .typeError(invalidMsg),
    phoneNumber: yup.string().label(phoneNumber.displayName).typeError(invalidMsg),
    companyName: yup.string().label(companyName.displayName).required(requiredMsg),
  });

  const form = useForm<IFormDataTrial>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, control } = form;

  const submit = async (data: IFormDataTrial) => {
    await submitForm(name, data);
  };

  const submitter = handleSubmit(submit);

  useImperativeHandle(ref, () => ({
    submit() {
      submitter();
    },
  }));

  return (
    <Flex as="form" onSubmit={submitter} flexDir="column" w="100%">
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
            required={lastName.required}
          />
        </FieldGroup>
        <FieldGroup>
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
        </FieldGroup>
        <FieldGroup>
          <TextInput
            ctl={control}
            id={phoneNumber.id}
            placeholder={phoneNumber.displayName}
            required={phoneNumber.required}
          />
        </FieldGroup>
      </FormProvider>
    </Flex>
  );
});
