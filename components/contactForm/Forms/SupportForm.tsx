import { useImperativeHandle } from 'react';
import { Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FieldGroup, TextArea, TextInput } from '~/components';
import { forwardRef, requiredMsg, invalidMsg } from '~/util';
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
    phoneNumber: yup.string().label(phoneNumber.displayName),
    companyName: yup.string().label(companyName.displayName).required(requiredMsg),
    details: yup
      .string()
      .label(details.displayName)
      .required('Please tell us how we can help you.'),
  });

  const form = useForm<ISupportFormFields>({ resolver: yupResolver(formSchema) });
  const { handleSubmit, control } = form;

  const submitForm = async (data: ISupportFormFields) => {
    await onSubmit('Support', data);
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
            defaultValue=""
            placeholder={firstName.displayName}
            isRequired={firstName.required}
          />
          <TextInput
            ctl={control}
            id={lastName.id}
            defaultValue=""
            placeholder={lastName.displayName}
            isRequired={firstName.required}
          />
          <TextInput
            ctl={control}
            id={companyName.id}
            defaultValue=""
            placeholder={companyName.displayName}
            isRequired={companyName.required}
          />
        </FieldGroup>
        <FieldGroup>
          <TextInput
            ctl={control}
            id={emailAddress.id}
            defaultValue=""
            placeholder={emailAddress.displayName}
            isRequired={emailAddress.required}
          />
          <TextInput
            ctl={control}
            id={phoneNumber.id}
            defaultValue=""
            placeholder={phoneNumber.displayName}
            isRequired={phoneNumber.required}
          />
        </FieldGroup>
        <FieldGroup>
          <TextInput
            ctl={control}
            id={subject.id}
            defaultValue=""
            placeholder={subject.displayName}
            isRequired={subject.required}
          />
        </FieldGroup>
        <FieldGroup>
          <TextArea
            ctl={control}
            id={details.id}
            defaultValue=""
            placeholder={details.displayName}
            isRequired={details.required}
          />
        </FieldGroup>
      </FormProvider>
    </Flex>
  );
});
