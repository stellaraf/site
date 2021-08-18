export type Term = 0 | 1 | 3;

export interface TermField {
  name: string;
  value: Term;
  modifier: number;
}

export interface BaseField {
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
  fields: Field[];
  staticFields: BaseField[];
}

export interface Quote {
  products: Product[];
  term: TermField;
}
