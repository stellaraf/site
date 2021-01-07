import { useImperativeHandle } from 'react';
import { Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { forwardRef, requiredMsg, invalidMsg, buildSelections } from '~/util';
import { FieldGroup, TextInput, TextArea, SelectField } from '../Fields';
import { useFormState } from '../state';

import type { ISalesFormFields, IForm, FormHandlers } from './types';

export const SalesForm = forwardRef<FormHandlers, IForm<'Sales'>>((props, ref) => {
  const { onSubmit, accent } = props;
  const ctx = useFormState();
  console.dir(ctx.form.Sales.get(), { depth: null });
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    companyName,
    interests,
    details,
  } = ctx.form.Sales.get();

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
          <SelectField
            id={interests.id}
            placeholder={interests.displayName}
            multi={interests.multiple}
            menuPortalTarget={document.body}
            width="100%"
            colorScheme={accent}
            opts={interests.options.map(buildSelections)}
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
