import type { Entry } from 'contentful';

export interface IFormFieldBase {
  name: string;
  id: string;
  displayName: string;
  required: boolean;
}

export interface IFormFieldText extends IFormFieldBase {
  validationType?: 'Email Address' | 'Phone Number';
}

export type IFormFieldTextArea = IFormFieldBase;

export interface IFormFieldSelect extends IFormFieldBase {
  multiple: boolean;
  options: string[];
}

export interface IFormModelSupport {
  name: string;
  firstName: IFormFieldText;
  lastName: IFormFieldText;
  emailAddress: IFormFieldText;
  phoneNumber: IFormFieldText;
  companyName: IFormFieldText;
  subject: IFormFieldText;
  details: IFormFieldTextArea;
  buttonSubmit: string;
}

export interface IFormModelSales {
  name: string;
  firstName: IFormFieldText;
  lastName: IFormFieldText;
  emailAddress: IFormFieldText;
  phoneNumber: IFormFieldText;
  companyName: IFormFieldText;
  interests: IFormFieldSelect;
  details: IFormFieldTextArea;
  buttonSubmit: string;
}

interface IFormModels {
  Support: IFormModelSupport;
  Sales: IFormModelSales;
}

export type FormModels<T extends 'Support' | 'Sales'> = IFormModels[T];
