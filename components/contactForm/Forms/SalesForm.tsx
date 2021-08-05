import { useImperativeHandle } from 'react';
import { Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FieldGroup, SelectField, TextArea, TextInput } from '~/components';
import { forwardRef, requiredMsg, invalidMsg, buildSelections } from '~/util';
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
    interests: yup.array(yup.string()),
    details: yup.string().label(details.displayName),
  });

  const form = useForm<ISalesFormFields>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, control } = form;
  const submitForm = async (data: ISalesFormFields) => {
    await onSubmit('Sales', data);
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
            multi={interests.multiple}
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
