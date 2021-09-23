import { isObject, objectHasKeys } from '~/types';

import type { BaseField, QuantityField, TierField, SelectField } from './types';

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
  return isBaseField(data) && data.__type === 'select';
}
