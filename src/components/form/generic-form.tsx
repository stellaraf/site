import { useImperativeHandle, forwardRef } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FormProvider, useForm, type UseFormHandleSubmit } from "react-hook-form";
import { useTitleCase } from "use-title-case";
import { z } from "zod";

import { FieldGroup, TextArea, TextInput, SelectField, CheckboxField } from "~/components";
import { is, submitForm } from "~/lib";
import { TextInputValidationType } from "~/types";

import {
  isCheckboxField,
  isSelectField,
  isTextAreaField,
  isTextInputField,
  isFormButton,
} from "./guards";

import type { GenericFormProps, FormField } from "./types";
import type { ZodRawShape } from "zod";

type FormSubmitter = ReturnType<UseFormHandleSubmit<Dict>>;

export interface FormSubmitRef {
  submit: FormSubmitter;
}

type GenericFormPropsWithRef<T extends FormField[]> = GenericFormProps<T> & {
  fRef: React.ForwardedRef<FormSubmitRef>;
};

function _GenericForm<Fields extends FormField[]>(props: GenericFormPropsWithRef<Fields>) {
  const {
    name,
    fRef,
    fields,
    button,
    colorScheme,
    onSubmit,
    buttonProps = {},
    fieldGroupProps = {},
    onSuccess,
    onFailure,
    ...rest
  } = props;

  const fnTitle = useTitleCase();

  const schemaObject = fields.reduce<ZodRawShape>((final, fieldConfig) => {
    let value;
    if (isCheckboxField(fieldConfig) || isSelectField(fieldConfig)) {
      value = z.array(z.string());
      if (fieldConfig.required) {
        value = z
          .array(z.string())
          .min(1, `Please select at least one option from ${fieldConfig.displayName}`);
      }
    } else if (isTextAreaField(fieldConfig)) {
      value = z.string();
      if (fieldConfig.required) {
        value = z.string().min(1, `'${fieldConfig.displayName}' is required`);
      } else {
        value = value.optional();
      }
    } else if (isTextInputField(fieldConfig)) {
      value = z.string();
      if (fieldConfig.validationType === TextInputValidationType.Email) {
        value = z.string().email(`${fieldConfig.displayName} is missing or invalid`);
      } else if (fieldConfig.validationType === TextInputValidationType.Phone) {
        value = z
          .string()
          .refine(
            (v: string) => isValidPhoneNumber(v, "US"),
            `${fieldConfig.displayName} is invalid`,
          );
      }
      if (!fieldConfig.required) {
        value = value.optional();
      }
    }
    if (typeof value !== "undefined" && !isFormButton(fieldConfig)) {
      final[fieldConfig.formId] = value;
    }
    return final;
  }, {});

  const schema = z.object(schemaObject);
  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: Schema) => {
    if (typeof onSubmit !== "undefined") {
      const maybePromise = onSubmit();
      if (maybePromise instanceof Promise) {
        await maybePromise;
      }
    }
    const result = await submitForm(name, data);
    if (result instanceof Error && typeof onFailure === "function") {
      const failureCallable = onFailure(data);
      if (failureCallable instanceof Promise) {
        await failureCallable;
      }
    } else {
      if (typeof onSuccess === "function") {
        const successCallable = onSuccess(data);
        if (successCallable instanceof Promise) {
          await successCallable;
        }
      }
    }
  };

  const submit = form.handleSubmit(handleSubmit);

  useImperativeHandle<FormSubmitRef, FormSubmitRef>(fRef, () => ({ submit }));

  const groups = fields.reduce<FormField[][]>((final, field) => {
    if (typeof final[field.fieldGroup] === "undefined") {
      final[field.fieldGroup] = [field];
    } else {
      final[field.fieldGroup] = [...final[field.fieldGroup], field];
    }
    return final;
  }, []);

  return (
    <Flex as="form" onSubmit={submit} flexDir="column" w={{ base: "100%", lg: "75%" }} {...rest}>
      <FormProvider {...form}>
        {groups.map((group, index) => (
          <FieldGroup key={index} className={`field-group-${index + 1}`} {...fieldGroupProps}>
            {group.map(field => {
              if (isCheckboxField(field)) {
                return (
                  <CheckboxField<Schema>
                    key={field.formId}
                    field={field}
                    name={field.formId}
                    isMulti={field.multiple}
                    label={field.displayName}
                    isRequired={field.required}
                    defaultValue={field.options[0]}
                    opts={field.options.map(opt => ({ value: opt, label: opt }))}
                  />
                );
              }
              if (isSelectField(field)) {
                return (
                  <SelectField
                    key={field.formId}
                    field={field}
                    width="100%"
                    name={field.formId}
                    isMulti={field.multiple}
                    required={field.required}
                    menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
                    // menuPortalTarget={document.body}
                    placeholder={field.displayName}
                    opts={field.options.map(opt => ({ value: opt, label: opt }))}
                  />
                );
              }
              if (isTextAreaField(field)) {
                return (
                  <TextArea<Schema>
                    key={field.formId}
                    field={field}
                    name={field.formId}
                    defaultValue=""
                    isRequired={field.required}
                    placeholder={field.displayName}
                  />
                );
              }
              if (isTextInputField(field)) {
                return (
                  <TextInput<Schema>
                    key={field.formId}
                    field={field}
                    defaultValue=""
                    name={field.formId}
                    isRequired={field.required}
                    placeholder={field.displayName}
                  />
                );
              }
              return <></>;
            })}
          </FieldGroup>
        ))}
        {is(button) && (
          <FieldGroup justifyContent="center" p={2} {...fieldGroupProps}>
            <Button
              w="100%"
              maxW="50%"
              type="submit"
              colorScheme={colorScheme}
              variant={button.variant ? button.variant : "outline"}
              {...buttonProps}
            >
              {fnTitle(button.text)}
            </Button>
          </FieldGroup>
        )}
      </FormProvider>
    </Flex>
  );
}

export const GenericForm = forwardRef(
  <V extends FormField[]>(props: GenericFormProps<V>, ref: React.ForwardedRef<FormSubmitRef>) => (
    <_GenericForm<V> fRef={ref} {...props} />
  ),
);

GenericForm.displayName = "GenericForm";