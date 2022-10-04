import { Button, Center, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { FieldGroup, TextInput } from '~/components';
import { useAlert } from '~/hooks';

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

  const formSchema = z.object({
    firstName: z.string().min(1, `${firstName.displayName} is required`),
    lastName: z.string().min(1, `${lastName.displayName} is required`),
    emailAddress: z.string().email(`${emailAddress.displayName} is required`),
    phoneNumber: z.string().refine(isValidPhoneNumber, 'Invalid phone number').optional(),
    companyName: z.string().min(1, `${companyName.displayName} is required`),
  });

  type Schema = z.infer<typeof formSchema>;

  const showAlert = useAlert();

  const form = useForm<Schema>({ resolver: zodResolver(formSchema) });
  const { handleSubmit, control, formState } = form;

  async function submit(data: Schema): Promise<void> {
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
