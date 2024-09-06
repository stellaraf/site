import { isValidPhoneNumber } from "libphonenumber-js";
import { type ZodObject, type ZodRawShape, type ZodTypeAny, z } from "zod";

import { TextInputValidationType } from "~/types";

import {
  isAddressSearchField,
  isCheckboxField,
  isCurrencyField,
  isDateField,
  isRemoteSelectField,
  isSelectField,
  isTextAreaField,
  isTextInputField,
} from "./guards";

import type { FormField } from "./types";

type BaseFormField = Omit<FormField, "fieldGroup"> & Record<string, unknown>;

function validatePhoneNumber(value: string, required: boolean) {
  if (!required) {
    return true;
  }
  return isValidPhoneNumber(value, "US");
}

export function getDefaultValues<Fields extends BaseFormField[]>(
  fields: Fields,
): Record<string, any> {
  const out: Record<string, any> = {};
  for (const field of fields) {
    if (isCheckboxField(field) || isSelectField(field) || isRemoteSelectField(field)) {
      out[field.formId] = null;
    } else if (isAddressSearchField(field)) {
      out[field.formId] = null;
    } else if (isDateField(field) || isTextAreaField(field) || isTextInputField(field)) {
      out[field.formId] = "";
    } else if (isCurrencyField(field)) {
      out[field.formId] = 0;
    }
  }
  return out;
}

export function createSchema<Fields extends BaseFormField[]>(
  fields: Fields,
): ZodObject<ZodRawShape, "strip", ZodTypeAny, Record<string, any>, Record<string, any>> {
  const obj: Record<string, any> = {};

  for (const field of fields) {
    // Checkbox or Select
    if (isCheckboxField(field) || isSelectField(field) || isRemoteSelectField(field)) {
      if (field.multiple && field.required) {
        obj[field.formId] = z
          .array(z.string())
          .min(1, `Please select at least one option from ${field.displayName}`);
      } else if (field.multiple && !field.required) {
        obj[field.formId] = z.array(z.string()).optional();
      } else if (!field.multiple && field.required) {
        obj[field.formId] = z.string().min(1, `Please select an option from ${field.displayName}`);
      } else if (!field.multiple && !field.required) {
        obj[field.formId] = z.string().optional();
      }
    }
    // Text Input
    if (isTextInputField(field)) {
      if (field.required) {
        obj[field.formId] = z.string().min(1, `'${field.displayName}' is required`);
      } else {
        obj[field.formId] = z.string();
      }
      if (typeof field.validationType !== "undefined") {
        if (field.validationType === TextInputValidationType.Email) {
          obj[field.formId] = z
            .string()
            .refine(
              v => v.match(`^(.+)\@(.+)\.(.+)$`),
              `${field.displayName} is missing or invalid`,
            );
        } else if (field.validationType === TextInputValidationType.Phone) {
          obj[field.formId] = z
            .string()
            .refine(
              v => validatePhoneNumber(v, field?.required ?? false),
              `${field.displayName} is invalid`,
            );
        }
      }
    }
    // Text Area & Address Search
    if (isTextAreaField(field) || isAddressSearchField(field)) {
      if (field.required) {
        obj[field.formId] = z.string().min(1, `'${field.displayName}' is required`);
      } else {
        obj[field.formId] = z.string().optional();
      }
    }
    // Currency
    if (isCurrencyField(field)) {
      if (field.required) {
        obj[field.formId] = z.coerce.number().min(1);
      } else {
        obj[field.formId] = z.coerce.number().optional();
      }
    }
    // Date
    if (isDateField(field)) {
      if (field.required) {
        obj[field.formId] = z.date();
      } else {
        obj[field.formId] = z.date().optional();
      }
    }
  }
  return z.object<ZodRawShape>(obj).required();
}
