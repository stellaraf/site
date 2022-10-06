import type { FlexProps } from "@chakra-ui/react";
import type { FieldValues } from "react-hook-form";
import type { CustomColors } from "~/types";

interface FormFieldsBase extends FieldValues {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone?: string;
  companyName: string;
  details: string;
}

export interface SupportFormFields extends FormFieldsBase {
  subject: string;
}

export interface SalesFormFields extends FormFieldsBase {
  interests: string[];
}

export type FormType = "Sales" | "Support";

interface FormFields {
  Support: SupportFormFields;
  Sales: SalesFormFields;
}

export type FormFieldValue<T extends FormType> = FormFields[T];

interface FormFields {
  Support: SupportFormFields;
  Sales: SalesFormFields;
}

export interface FormProps<T extends FormType> extends Omit<FlexProps, "onSubmit"> {
  onSubmit(f: T, d: FormFields[T]): void;
  accent: keyof CustomColors;
}

export interface FormHandlers {
  submit: () => void;
}

export interface FormResponse {
  success: boolean;
  message: string;
}
