import type { FlexProps } from '@chakra-ui/react';
import type { CustomColors } from '~/types';

interface IFormFieldsBase {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName: string;
  details: string;
}

export interface ISupportFormFields extends IFormFieldsBase {}

export interface ISalesFormFields extends IFormFieldsBase {
  interests: string[];
}

export type TFormTypes = 'Sales' | 'Support';

interface IFormFields {
  Support: ISupportFormFields;
  Sales: ISalesFormFields;
}

export type TFormFields<T extends TFormTypes> = IFormFields[T];

interface FormFields {
  Support: ISupportFormFields;
  Sales: ISalesFormFields;
}

export interface IForm<T extends TFormTypes> extends Omit<FlexProps, 'onSubmit'> {
  onSubmit(f: T, d: FormFields[T]): void;
  accent: keyof CustomColors;
}

export interface FormHandlers {
  submit: () => void;
}

export type TFormResponse = {
  success: boolean;
  message: string;
};
