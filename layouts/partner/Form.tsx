import { useState } from '@hookstate/core';
import { Button, Center, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { FieldGroup, TextInput } from 'site/components';
import { useAlert } from 'site/hooks';
import { requiredMsg, invalidMsg } from 'site/util';
import { usePartnerCtx } from './PartnerLayout';
import { submitForm } from './submitForm';

import type { IFormDataTrial } from './types';

export const Form = () => {
  const { name, trialForm } = usePartnerCtx();

  const trialFormState = useState(trialForm);

  const { firstName, lastName, emailAddress, phoneNumber, companyName } = trialFormState.get();

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
  const showAlert = useAlert();

  const form = useForm<IFormDataTrial>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, control, formState } = form;

  const submit = async (data: IFormDataTrial) => {
    const response = await submitForm(name, { ...data, interests: [`${name} Trial`], details: '' });

    if (!response.success) {
      showAlert({ message: response.message, status: 'error' });
    } else if (response.success) {
      showAlert({ message: trialForm.successMessage.value, status: 'success' });
    }
  };

  const submitter = handleSubmit(submit);

  return (
    <>
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
          <Center px={2} mt={4} w="100%">
            <Button
              isLoading={formState.isSubmitting}
              w="100%"
              type="submit"
              variant="outline"
              colorScheme="primary">
              {trialForm.buttonSubmit.value}
            </Button>
          </Center>
        </FormProvider>
      </Flex>
    </>
  );
};
