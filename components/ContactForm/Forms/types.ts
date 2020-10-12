import type { FlexProps } from '@chakra-ui/core';
import type { CustomColors } from 'site/types';

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

interface FormFields {
  Support: ISupportFormFields;
  Sales: ISalesFormFields;
}

export interface IForm<T extends 'Sales' | 'Support'> extends Omit<FlexProps, 'onSubmit'> {
  onSubmit: (d: FormFields[T]) => any;
  accent: keyof CustomColors;
}

export interface FormHandlers {
  submit: () => void;
}
