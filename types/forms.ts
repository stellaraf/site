import { ParsedEntry } from './contentful';

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

export type IFormModel = {
  name: string;
  firstName: IFormFieldText;
  lastName: IFormFieldText;
  emailAddress: IFormFieldText;
  phoneNumber: IFormFieldText;
  companyName: IFormFieldText;
  details: IFormFieldTextArea;
  buttonSubmit: string;
  successMessage: string;
};

export type IFormModelEntry = {
  name: string;
  firstName: ParsedEntry<IFormFieldText>;
  lastName: ParsedEntry<IFormFieldText>;
  emailAddress: ParsedEntry<IFormFieldText>;
  phoneNumber: ParsedEntry<IFormFieldText>;
  companyName: IFormFieldText;
  details: ParsedEntry<IFormFieldTextArea>;
  buttonSubmit: string;
  successMessage: string;
};

export type IFormModelSupport = IFormModel & {
  subject: IFormFieldText;
};

export type IFormModelSales = IFormModel & {
  interests: IFormFieldSelect;
};

export type IFormModelSupportEntry = IFormModelEntry & {
  subject: ParsedEntry<IFormFieldText>;
};

export type IFormModelSalesEntry = IFormModelEntry & {
  interests: ParsedEntry<IFormFieldSelect>;
};

type IFormModels = {
  Support: IFormModelSupport;
  Sales: IFormModelSales;
};

type IFormModelsEntry = {
  Support: IFormModelSupportEntry;
  Sales: IFormModelSalesEntry;
};

export type FormTypes = 'Support' | 'Sales';

export type FormModel<T extends FormTypes> = IFormModels[T];
export type FormModelEntry<T extends FormTypes> = ParsedEntry<IFormModelsEntry[T]>;

export type IFormModelTrial = {
  name: string;
  firstName: IFormFieldText;
  lastName: IFormFieldText;
  emailAddress: IFormFieldText;
  phoneNumber: IFormFieldText;
  companyName: IFormFieldText;
  buttonSubmit: string;
  successMessage: string;
};

export interface IFormDataTrial {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  companyName: string;
  interests: string[];
  details: string;
}
