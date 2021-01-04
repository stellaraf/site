import type { TContactQuery, TSupportedFormQuery } from './types';
/**
 * Type guard to determine if the URL query references a valid form.
 */
export function queryIsForm(query: TContactQuery): query is TSupportedFormQuery {
  let result = false;
  if ('form' in query) {
    if (query.form === 'support' || query.form === 'sales') {
      result = true;
    }
  }
  return result;
}
