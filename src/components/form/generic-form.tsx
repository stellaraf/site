import { Fragment, forwardRef, useEffect, useImperativeHandle } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type UseFormHandleSubmit, useForm } from "react-hook-form";
import { useTitleCase } from "use-title-case";

import { H4 } from "~/components";
import { awaitIfNeeded, is, submitForm } from "~/lib";
import { AddressSearchField } from "./address-search-field";
import { CheckboxField } from "./checkbox-field";
import { CurrencyField } from "./currency-field";
import { DateField } from "./date-field";
import { FieldGroup } from "./field-group";
import { RemoteSelectField } from "./remote-select-field";
import { SelectField } from "./select-field";
import { TextArea } from "./text-area";
import { TextInput } from "./text-input";

import {
  isAddressSearchField,
  isCheckboxField,
  isCurrencyField,
  isDateField,
  isFormGroup,
  isRemoteSelectField,
  isSelectField,
  isTextAreaField,
  isTextInputField,
} from "./guards";
import { createSchema, getDefaultValues } from "./schema";

import type { z } from "zod";
import type { FormGroup } from "~/types";
import type { FormField, GenericFormProps } from "./types";

type FormSubmitter = ReturnType<UseFormHandleSubmit<Dict>>;

export interface FormSubmitRef {
  submit: FormSubmitter;
}

type GenericFormPropsWithRef<T extends FormField[]> = GenericFormProps<T> & {
  fRef: React.ForwardedRef<FormSubmitRef>;
};

function getFormGroup(formGroups: FormGroup[], field: FormField): FormGroup | undefined {
  return formGroups.find(v => v.groupId === field.fieldGroup);
}

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

  const defaultValues = getDefaultValues(fields);

  const form = useForm<Schema>({ defaultValues, resolver: zodResolver(schema) });

  const handleSubmit = async (data: Schema) => {
    if (typeof onSubmit === "function") {
      awaitIfNeeded(onSubmit);
    }
    const result = await submitForm(name, data);

    if (result instanceof Error || !result.ok) {
      if (typeof onFailure === "function") {
        await awaitIfNeeded(onFailure, result);
      }
    } else {
      if (typeof onSuccess === "function") {
        await awaitIfNeeded(onSuccess, result);
      }
    }
  };

  const submit = form.handleSubmit(handleSubmit);

  useImperativeHandle<FormSubmitRef, FormSubmitRef>(fRef, () => ({ submit }));

  const formGroups = fields.filter(field => isFormGroup(field)) as FormGroup[];

  const groups = fields.reduce<FormField[][]>((final, field) => {
    if (isFormGroup(field)) {
      return final;
    }
    if (typeof field.fieldGroup !== "undefined") {
      if (typeof final[field.fieldGroup] === "undefined") {
        final[field.fieldGroup] = [field];
      } else {
        final[field.fieldGroup] = [...final[field.fieldGroup], field];
      }
    }
    return final;
  }, []);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful && form.formState.isValid) {
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful, form.formState.isValid]);

  return (
    <Flex as="form" onSubmit={submit} flexDir="column" w={{ base: "100%", lg: "75%" }} {...rest}>
      <FormProvider {...form}>
        {groups.map((group, index) => {
          const formGroup = getFormGroup(formGroups, group[0]);
          return (
            <Flex direction="column" key={index}>
              {typeof formGroup !== "undefined" && <H4>{formGroup.name}</H4>}
              <FieldGroup
                direction="column"
                className={`$form--${name}--field-group-${index + 1}`}
                {...fieldGroupProps}
              >
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
                        opts={field.options.map(opt => ({ value: opt, label: opt }))}
                      />
                    );
                  }
                  if (isSelectField(field)) {
                    return (
                      <SelectField
                        field={field}
                        key={field.formId}
                        name={field.formId}
                        isMulti={field.multiple}
                        creatable={field.creatable}
                        required={field.required}
                        placeholder={field.displayName}
                        options={field.options.map(opt => ({ value: opt, label: opt }))}
                      />
                    );
                  }
                  if (isRemoteSelectField(field)) {
                    return (
                      <RemoteSelectField
                        field={field}
                        key={field.formId}
                        name={field.formId}
                        isMulti={field.multiple}
                        required={field.required}
                        placeholder={field.displayName}
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
                  if (isAddressSearchField(field)) {
                    return (
                      <AddressSearchField
                        field={field}
                        key={field.formId}
                        name={field.formId}
                        required={field.required}
                        isRequired={field.required}
                        placeholder={field.displayName}
                      />
                    );
                  }
                  if (isDateField(field)) {
                    return (
                      <DateField
                        field={field}
                        key={field.formId}
                        name={field.formId}
                        defaultValue={{}}
                      />
                    );
                  }
                  if (isCurrencyField(field)) {
                    return (
                      <CurrencyField
                        field={field}
                        key={field.formId}
                        name={field.formId}
                        defaultValue={0}
                      />
                    );
                  }
                  return <Fragment key={index} />;
                })}
              </FieldGroup>
            </Flex>
          );
        })}
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
