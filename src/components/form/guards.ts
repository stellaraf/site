import { notNullUndefined } from "~/types";

import type {
  CheckboxField,
  FormButton,
  SelectField,
  TextAreaField,
  TextInputField,
} from "~/types/schema";

export function isCheckboxField(field: unknown): field is CheckboxField {
  if (!notNullUndefined(field)) return false;
  return (field as Record<string, unknown>).__typename === "CheckboxField";
}

export function isSelectField(field: unknown): field is SelectField {
  if (!notNullUndefined(field)) return false;
  return (field as Record<string, unknown>).__typename === "SelectField";
}

export function isTextAreaField(field: unknown): field is TextAreaField {
  if (!notNullUndefined(field)) return false;
  return (field as Record<string, unknown>).__typename === "TextAreaField";
}

export function isTextInputField(field: unknown): field is TextInputField {
  if (!notNullUndefined(field)) return false;
  return (field as Record<string, unknown>).__typename === "TextInputField";
}

export function isFormButton(field: unknown): field is FormButton {
  if (!notNullUndefined(field)) return false;
  return (field as Record<string, unknown>).__typename === "FormButton";
}
