import { useImperativeHandle } from 'react';
import { Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { FieldGroup, SelectField, TextArea, TextInput } from '~/components';
import { forwardRef, buildSelections } from '~/util';
import { useContactFormConfig } from '../state';

import type { ISalesFormFields, IForm, FormHandlers } from './types';

export const SalesForm = forwardRef<FormHandlers, IForm<'Sales'>>((props, ref) => {
  const { onSubmit, accent } = props;
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    companyName,
    interests,
    details,
  } = useContactFormConfig('Sales');

  const formSchema = z.object({
    firstName: z.string().min(1, `${firstName.displayName} is required`),
    lastName: z.string().min(1, `${lastName.displayName} is required`),
    emailAddress: z.string().email(`${emailAddress.displayName} is required`),
    phoneNumber: z.string().refine(isValidPhoneNumber, 'Invalid phone number').optional(),
    companyName: z.string().min(1, `${companyName.displayName} is required`),
    interests: z.array(z.string()).min(1, 'Please select at least one interest'),
    details: z.string().min(1, 'Please tell us how we can help you'),
  });

  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const { handleSubmit, control } = form;
  const submitForm = async (data: ISalesFormFields) => {
    return onSubmit('Sales', data);
  };
  const submitter = handleSubmit(submitForm);

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
            defaultValue=""
            id={firstName.id}
            isRequired={firstName.required}
            placeholder={firstName.displayName}
          />
          <TextInput
            ctl={control}
            defaultValue=""
            id={lastName.id}
            isRequired={lastName.required}
            placeholder={lastName.displayName}
          />
          <TextInput
            ctl={control}
            defaultValue=""
            id={companyName.id}
            isRequired={companyName.required}
            placeholder={companyName.displayName}
          />
        </FieldGroup>
        <FieldGroup>
          <TextInput
            ctl={control}
            defaultValue=""
            id={emailAddress.id}
            isRequired={emailAddress.required}
            placeholder={emailAddress.displayName}
          />
          <TextInput
            ctl={control}
            defaultValue=""
            id={phoneNumber.id}
            isRequired={phoneNumber.required}
            placeholder={phoneNumber.displayName}
          />
        </FieldGroup>

        <FieldGroup>
          <SelectField
            width="100%"
            id={interests.id}
            colorScheme={accent}
            isMulti={interests.multiple}
            menuPortalTarget={document.body}
            placeholder={interests.displayName}
            opts={interests.options.map(buildSelections)}
          />
        </FieldGroup>
        <FieldGroup>
          <TextArea
            ctl={control}
            id={details.id}
            defaultValue=""
            isRequired={details.required}
            placeholder={details.displayName}
          />
        </FieldGroup>
      </FormProvider>
    </Flex>
  );
});
