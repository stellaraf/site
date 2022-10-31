import type { ParsedEntry } from "./contentful";

interface FormFieldEntryBase {
  id: string;
  name: string;
  displayName: string;
  required: boolean;
}

type FormFieldEntry<Extra> = FormFieldEntryBase & Extra;

type FormWithFieldConfig<F, E extends Partial<F> = Partial<F>> = {
  [k in keyof F]: {
    name: string;
    id: k;
    displayName: string;
    required: boolean;
  } & E[k];
};

type FormWithFieldConfigEntry<F, E extends Partial<F> = Partial<F>> = {
  [k in keyof F]: ParsedEntry<
    {
      name: string;
      id: k;
      displayName: string;
      required: boolean;
    } & E[k]
  >;
};

type NoExtraValidation = Record<never, never>;
type TextExtraFields = { validationType?: "Email Address" | "Phone Number" };
type SelectExtraFields = { multiple: boolean; options: string[] };

// interface FormGenericModel {
//   name: string;
//   buttonSubmit: string;
//   successMessage: string;
//   formFields: Array<
//     | FormFieldEntry<NoExtraValidation>
//     | FormFieldEntry<TextExtraFields>
//     | FormFieldEntry<SelectExtraFields>
//   >;
// }

export type GenericFormFields = Array<
  | FormFieldEntry<NoExtraValidation>
  | FormFieldEntry<TextExtraFields>
  | FormFieldEntry<SelectExtraFields>
>;

// interface FormGenericEntry extends Omit<FormGenericModel, "formFields"> {
//   formFields: ContentType<
//     | FormFieldEntry<NoExtraValidation>
//     | FormFieldEntry<TextExtraFields>
//     | FormFieldEntry<SelectExtraFields>
//   >;
// }

export type TFormModel = {
  name: string;
  buttonSubmit: string;
  successMessage: string;
} & FormWithFieldConfig<{
  firstName: TextExtraFields;
  lastName: TextExtraFields;
  emailAddress: TextExtraFields;
  phoneNumber: TextExtraFields;
  companyName: TextExtraFields;
  details: NoExtraValidation;
}>;

export type IFormModel = {
  name: string;
  buttonSubmit: string;
  successMessage: string;
} & FormWithFieldConfig<{
  firstName: TextExtraFields;
  lastName: TextExtraFields;
  emailAddress: TextExtraFields;
  phoneNumber: TextExtraFields;
  companyName: TextExtraFields;
  details: NoExtraValidation;
}>;

export type IFormModelEntry = {
  name: string;
  buttonSubmit: string;
  successMessage: string;
} & FormWithFieldConfigEntry<{
  firstName: TextExtraFields;
  lastName: TextExtraFields;
  emailAddress: TextExtraFields;
  phoneNumber: TextExtraFields;
  companyName: TextExtraFields;
  details: NoExtraValidation;
}>;

export type IFormModelSupport = IFormModel & FormWithFieldConfig<{ subject: TextExtraFields }>;

export type IFormModelSales = IFormModel & FormWithFieldConfig<{ interests: SelectExtraFields }>;

export type IFormModelSupportEntry = IFormModelEntry &
  FormWithFieldConfigEntry<{ subject: TextExtraFields }>;

export type IFormModelSalesEntry = IFormModelEntry &
  FormWithFieldConfigEntry<{ interests: SelectExtraFields }>;

type IFormModels = {
  Support: IFormModelSupport;
  Sales: IFormModelSales;
};

type IFormModelsEntry = {
  Support: IFormModelSupportEntry;
  Sales: IFormModelSalesEntry;
};

export type FormTypes = "Support" | "Sales";

export type FormModel<T extends FormTypes> = IFormModels[T];
export type FormModelEntry<T extends FormTypes> = ParsedEntry<IFormModelsEntry[T]>;

export type TFormModelTrial = {
  name: string;
  buttonSubmit: string;
  successMessage: string;
} & FormWithFieldConfig<{
  firstName: TextExtraFields;
  lastName: TextExtraFields;
  emailAddress: TextExtraFields;
  phoneNumber: TextExtraFields;
  companyName: TextExtraFields;
}>;

export interface IFormDataTrial {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  companyName: string;
  interests: string[];
  details: string;
}

export type TFormResponse = {
  success: boolean;
  message: string;
};

export interface SelectOptionAny {
  label: string;
}

export interface SelectOptionSingle<T extends Dict = Dict> extends SelectOptionAny {
  value: string;
  group?: string;
  data?: T;
}
