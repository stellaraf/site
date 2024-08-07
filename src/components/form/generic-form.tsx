import { Fragment, forwardRef, useImperativeHandle } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type UseFormHandleSubmit, useForm } from "react-hook-form";
import { useTitleCase } from "use-title-case";

import { CheckboxField, FieldGroup, SelectField, TextArea, TextInput } from "~/components";
import { awaitIfNeeded, is, submitForm } from "~/lib";

import { isCheckboxField, isSelectField, isTextAreaField, isTextInputField } from "./guards";
import { createSchema } from "./schema";

import type { z } from "zod";
import type { FormField, GenericFormProps } from "./types";

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

  const schema = createSchema(fields);
  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: Schema) => {
    if (typeof onSubmit === "function") {
      awaitIfNeeded(onSubmit);
    }
    const result = await submitForm(name, data);
    const isError = result instanceof Error || !result.ok;

    if (isError) {
      if (typeof onFailure === "function") {
        await awaitIfNeeded(onFailure, result);
      }
    } else {
      if (typeof onSuccess === "function") {
        await awaitIfNeeded(onSuccess, result);
      }
      form.reset();
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
                    field={field}
                    key={field.formId}
                    name={field.formId}
                    isMulti={field.multiple}
                    label={field.displayName}
                    isRequired={field.required}
                    defaultValue={field.options[0]}
                    opts={field.options.map(opt => ({
                      value: opt,
                      label: opt,
                    }))}
                  />
                );
              }
              if (isSelectField(field)) {
                return (
                  <SelectField
                    width="100%"
                    field={field}
                    key={field.formId}
                    name={field.formId}
                    isMulti={field.multiple}
                    required={field.required}
                    placeholder={field.displayName}
                    opts={field.options.map(opt => ({
                      value: opt,
                      label: opt,
                    }))}
                    menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
                  />
                );
              }
              if (isTextAreaField(field)) {
                return (
                  <TextArea<Schema>
                    field={field}
                    defaultValue=""
                    key={field.formId}
                    name={field.formId}
                    isRequired={field.required}
                    placeholder={field.displayName}
                  />
                );
              }
              if (isTextInputField(field)) {
                return (
                  <TextInput<Schema>
                    field={field}
                    defaultValue=""
                    key={field.formId}
                    name={field.formId}
                    isRequired={field.required}
                    placeholder={field.displayName}
                  />
                );
              }
              return <Fragment key={index} />;
            })}
          </FieldGroup>
        ))}
        {is(button) && (
          <FieldGroup justifyContent="center" p={2} {...fieldGroupProps}>
            <Button
              w="100%"
              type="submit"
              maxW={{ lg: "50%" }}
              colorScheme={colorScheme}
              isLoading={form.formState.isSubmitting}
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
