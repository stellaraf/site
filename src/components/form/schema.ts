import { isValidPhoneNumber } from "libphonenumber-js";
import {
  type ZodArray,
  type ZodEffects,
  type ZodObject,
  type ZodRawShape,
  type ZodString,
  type ZodTypeAny,
  z,
} from "zod";

import { is } from "~/lib";
import { TextInputValidationType } from "~/types";

import {
  isAddressSearchField,
  isCheckboxField,
  isCurrencyField,
  isDateField,
  isSelectField,
  isTextAreaField,
  isTextInputField,
} from "./guards";

import type { FormField } from "./types";

type BaseFormField = Omit<FormField, "fieldGroup"> & Record<string, unknown>;

function createRequiredString(field: BaseFormField): ZodString {
  return z.string().min(1, `'${field.displayName}' is required`);
}

function createRequiredArray(field: BaseFormField): ZodArray<ZodString, "many"> {
  return z.array(z.string()).min(1, `Please select at least one option from ${field.displayName}`);
}

function createEmailString(field: BaseFormField): ZodString {
  return z.string().email(`${field.displayName} is missing or invalid`);
}

function createPhoneNumberString(field: BaseFormField): ZodEffects<ZodString, string, string> {
  return z
    .string()
    .refine(
      v => validatePhoneNumber(v, field?.required ?? false),
      `${field.displayName} is invalid`,
    );
}

function validatePhoneNumber(value: string, required: boolean) {
  if (!required) {
    return true;
  }
  return isValidPhoneNumber(value, "US");
}

export function createSchema<Fields extends BaseFormField[]>(
  fields: Fields,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ZodObject<ZodRawShape, "strip", ZodTypeAny, Record<string, any>, Record<string, any>> {
  const schema = fields.reduce<ZodRawShape>((final, fieldConfig) => {
    let value;

    // Checkbox or Select
    if (isCheckboxField(fieldConfig) || isSelectField(fieldConfig)) {
      if (fieldConfig.multiple) {
        value = z.array(z.string());

        if (fieldConfig.required) {
          value = createRequiredArray(fieldConfig);
        }
      } else {
        value = z.string();

        if (fieldConfig.required) {
          value = createRequiredString(fieldConfig);
        }
      }
      // Add field to schema
      is(value) && (final[fieldConfig.formId] = value);
      return final;
    } else if (isAddressSearchField(fieldConfig)) {
      value = fieldConfig.required ? createRequiredString(fieldConfig) : z.string();
      is(value) && (final[fieldConfig.formId] = value);
      return final;
    } // Date Field
    else if (isDateField(fieldConfig)) {
      value = z.date();
      is(value) && (final[fieldConfig.formId] = value);
      return final;
    } // Currency Field
    else if (isCurrencyField(fieldConfig)) {
      value = z.coerce.number();
      if (fieldConfig.required) {
        value = value.min(1);
      }
      is(value) && (final[fieldConfig.formId] = value);
      return final;
    }
    // Text Area
    else if (isTextAreaField(fieldConfig)) {
      value = z.string();

      if (fieldConfig.required) {
        value = createRequiredString(fieldConfig);
      } else {
        value = value.optional();
      }

      // Add field to schema
      is(value) && (final[fieldConfig.formId] = value);
      return final;
    }
    // Text Input
    else if (isTextInputField(fieldConfig)) {
      value = z.string();

      // Handle non-validated input field required vs. optional.
      if (fieldConfig.required) {
        value = createRequiredString(fieldConfig);
      } else {
        value = value.optional();
      }

      // Handle email address input field validation.
      if (fieldConfig.validationType === TextInputValidationType.Email) {
        value = createEmailString(fieldConfig);
      }
      // Handle phone number input field validation.
      else if (fieldConfig.validationType === TextInputValidationType.Phone) {
        value = createPhoneNumberString(fieldConfig);
      }

      // Make sure `optional` is still set after phone and email validations.
      if (!fieldConfig.required) {
        value = value.optional();
      }

      // Add field to schema
      is(value) && (final[fieldConfig.formId] = value);
      return final;
    }
    return final;
  }, {});

  return z.object<ZodRawShape>(schema);
}
