import type { DeepEntry, ColorNames } from '~/types';

export interface TermField {
  name: string;
  value: number;
  modifier: number;
}

export interface BaseField {
  __type: unknown;
  name: string;
  productCode: string;
  unitPrice: number;
  info?: string;
}

export interface QuantityField extends BaseField {
  __type: 'quantity';
  inputType: 'text' | 'slider';
  decimalPlaces: number;
}

export interface TierFieldStep extends BaseField {
  step: number;
}

export interface TierField extends BaseField {
  __type: 'tier';
  steps: TierFieldStep[];
}

export interface SelectFieldOption extends Omit<BaseField, 'info'> {}

export interface CheckboxField extends BaseField {
  __type: 'checkbox';
  checkedByDefault: boolean;
}

export interface SelectField {
  __type: 'select';
  name: string;
  info?: string;
  inputType: 'dropdown' | 'radio';
  options: SelectFieldOption[];
}

export type Field = QuantityField | SelectField | TierField | CheckboxField;

export interface Product {
  name: string;
  formFields: Field[];
  configurations: Configuration[];
  staticFields: BaseField[];
}

export interface Quote {
  name: string;
  products: Product[];
  term: TermField;
}

export interface ConfigurationItem {
  name: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit?: string;
}

export interface Configuration {
  name: string;
  description: string;
  products: ConfigurationItem[];
  addOns: Field[];
  color: Extract<ColorNames, 'blue' | 'purple' | 'green' | 'cyan' | 'red' | 'yellow' | 'orange'>;
}

export type QuoteEntry = DeepEntry<Quote>;
