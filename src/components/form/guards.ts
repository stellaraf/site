import { is } from "~/lib";

import type {
  AddressSearchField,
  CheckboxField,
  CurrencyField,
  DateField,
  FormButton,
  FormGroup,
  RemoteSelectField,
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

export function isAddressSearchField(field: unknown): field is AddressSearchField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "AddressSearchField";
}

export function isFormGroup(field: unknown): field is FormGroup {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "FormGroup";
}

export function isDateField(field: unknown): field is DateField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "DateField";
}

export function isCurrencyField(field: unknown): field is CurrencyField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "CurrencyField";
}

export function isRemoteSelectField(field: unknown): field is RemoteSelectField {
  if (!is(field)) return false;
  return (field as Record<string, unknown>).__typename === "RemoteSelectField";
}
