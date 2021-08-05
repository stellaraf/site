import type { TContactQuery, TSupportedFormQuery, AvailableForms } from './types';

export function isSupportedForm(name: unknown): name is keyof AvailableForms {
  return typeof name === 'string' && ['support', 'sales'].includes(name.toLowerCase());
}

/**
 * Type guard to determine if the URL query references a valid form.
 */
export function queryIsForm(query: TContactQuery): query is TSupportedFormQuery {
  let result = false;
  if ('form' in query) {
    result = isSupportedForm(query.form);
  }
  return result;
}
