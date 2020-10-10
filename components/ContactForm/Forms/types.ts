import type { FlexProps } from '@chakra-ui/core';
import type { CustomColors } from 'site/types';

interface IFormFieldsBase {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName: string;
  description: string;
}

export interface ISupportFormFields extends IFormFieldsBase {}

export interface ISalesFormFields extends IFormFieldsBase {
  interests: string[];
}

export interface IForm extends Omit<FlexProps, 'onSubmit'> {
  onSubmit: (d: ISupportFormFields | ISalesFormFields) => any;
  accent: keyof CustomColors;
}

export interface FormHandlers {
  submit: () => void;
}
