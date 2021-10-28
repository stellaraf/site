import { isObject, objectHasKeys } from '~/types';

import type {
  BaseField,
  QuantityField,
  TierField,
  SelectField,
  SelectFieldOption,
  CheckboxField,
} from './types';

/**
 * Determine if `data` is an object of `BaseField` type.
 */
export function isBaseField(data: unknown): data is BaseField {
  return isObject<BaseField>(data) && objectHasKeys<BaseField>(data, 'name', 'productCode');
}

/**
 * Determine if an object is `QuantityField`.
 */
export function isQuantityField(data: unknown): data is QuantityField {
  return isBaseField(data) && data.__type === 'quantity';
}

/**
 * Determine if an object is `TierField`.
 */
export function isTierField(data: unknown): data is TierField {
  return isBaseField(data) && data.__type === 'tier';
}

/**
 * Determine if an object is `SelectField`.
 */
export function isSelectField(data: unknown): data is SelectField {
  return (
    isObject<SelectField>(data) &&
    objectHasKeys<SelectField>(data, 'name', 'options') &&
    data.__type === 'select'
  );
}

/**
 * Determine if an object is `SelectFieldOption`.
 */
export function isSelectFieldOption(data: unknown): data is SelectFieldOption {
  return isBaseField(data);
}

/**
 * Determine if an object is `SelectField`.
 */
export function isCheckboxField(data: unknown): data is CheckboxField {
  return isBaseField(data) && data.__type === 'checkbox';
}
