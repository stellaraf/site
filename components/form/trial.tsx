import { Button, Center, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FieldGroup, TextInput } from '~/components';
import { useAlert } from '~/hooks';
import { requiredMsg, invalidMsg } from '~/util';

import type { IFormDataTrial } from '~/types';
import type { TTrialForm } from './types';

export const TrialForm = (props: TTrialForm): JSX.Element => {
  const { name, fields, onSubmit } = props;

  const {
    lastName,
    firstName,
    phoneNumber,
    companyName,
    emailAddress,
    buttonSubmit,
    successMessage,
  } = fields;

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

  async function submit(data: IFormDataTrial): Promise<void> {
    const response = await onSubmit({ ...data, interests: [`${name} Trial`], details: '' });

    if (!response.success) {
      showAlert({ message: response.message, status: 'error' });
    } else if (response.success) {
      showAlert({ message: successMessage, status: 'success' });
    }
  }

  return (
    <>
      <Flex as="form" onSubmit={handleSubmit(submit)} flexDir="column" w="100%">
        <FormProvider {...form}>
          <FieldGroup>
            <TextInput
              ctl={control}
              id={firstName.id}
              isRequired={firstName.required}
              placeholder={firstName.displayName}
            />
            <TextInput
              ctl={control}
              id={lastName.id}
              isRequired={lastName.required}
              placeholder={lastName.displayName}
            />
          </FieldGroup>
          <FieldGroup>
            <TextInput
              ctl={control}
              id={companyName.id}
              isRequired={companyName.required}
              placeholder={companyName.displayName}
            />
          </FieldGroup>
          <FieldGroup>
            <TextInput
              ctl={control}
              id={emailAddress.id}
              isRequired={emailAddress.required}
              placeholder={emailAddress.displayName}
            />
          </FieldGroup>
          <FieldGroup>
            <TextInput
              ctl={control}
              id={phoneNumber.id}
              isRequired={phoneNumber.required}
              placeholder={phoneNumber.displayName}
            />
          </FieldGroup>
          <Center px={2} mt={4} w="100%">
            <Button
              w="100%"
              type="submit"
              variant="outline"
              colorScheme="primary"
              isLoading={formState.isSubmitting}
            >
              {buttonSubmit}
            </Button>
          </Center>
        </FormProvider>
      </Flex>
    </>
  );
};
