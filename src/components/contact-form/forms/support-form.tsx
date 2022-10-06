import { useImperativeHandle } from "react";

import { Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { FieldGroup, TextArea, TextInput } from "~/components";

import type { FormProps, FormHandlers } from "./types";
import { forwardRef } from "~/util";

import { useContactFormConfig } from "../state";

export const SupportForm = forwardRef<FormHandlers, FormProps<"Support">>((props, ref) => {
  const { onSubmit } = props;
  const { firstName, lastName, emailAddress, phoneNumber, companyName, subject, details } =
    useContactFormConfig("Support");

  const formSchemaZod = z.object({
    firstName: z.string().min(1, `${firstName.displayName} is required`),
    lastName: z.string().min(1, `${lastName.displayName} is required`),
    emailAddress: z.string().email(`${emailAddress.displayName} is required`),
    phoneNumber: z.string().refine(isValidPhoneNumber, "Invalid phone number").optional(),
    companyName: z.string().min(1, `${companyName.displayName} is required`),
    subject: z.string().min(1, `${subject.displayName} is required`),
    details: z.string().min(1, "Please tell us how we can help you"),
  });

  const form = useForm<z.infer<typeof formSchemaZod>>({
    resolver: zodResolver(formSchemaZod),
  });

  const { handleSubmit, control } = form;

  const submitForm = async (data: z.infer<typeof formSchemaZod>) => {
    return onSubmit("Support", data);
  };

  const submitter = handleSubmit(submitForm);

  useImperativeHandle(ref, () => ({
    submit() {
      submitter();
    },
  }));

  return (
    <Flex as="form" onSubmit={submitter} flexDir="column" w={{ base: "100%", lg: "75%" }}>
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
