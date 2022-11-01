import { is } from "~/lib";

import type {
  CheckboxField,
  FormButton,
  SelectField,
  TextAreaField,
  TextInputField,
} from "~/types";

export function isCheckboxField(field: unknown): field is CheckboxField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "CheckboxField";
}

export function isSelectField(field: unknown): field is SelectField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "SelectField";
}

export function isTextAreaField(field: unknown): field is TextAreaField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "TextAreaField";
}

export function isTextInputField(field: unknown): field is TextInputField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "TextInputField";
}

export function isFormButton(field: unknown): field is FormButton {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "FormButton";
}
