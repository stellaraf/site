import type { DeepEntry } from '~/types';

export interface TermField {
  name: string;
  value: number;
  modifier: number;
}

export interface BaseField {
  [k: string]: unknown;
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

export interface SelectField extends BaseField {
  __type: 'select';
  inputType: 'dropdown' | 'radio';
  options: SelectFieldOption[];
}

export type Field = QuantityField | SelectField | TierField;

export interface Product {
  name: string;
  formFields: Field[];
  staticFields: BaseField[];
}

export interface Quote {
  name: string;
  products: Product[];
  term: TermField;
}
export type QuoteEntry = DeepEntry<Quote>;
