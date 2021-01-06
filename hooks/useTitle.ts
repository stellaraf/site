import { useCallback } from 'react';
import zeitTitle from 'title';
import { useConfig } from '~/context';

import type { TitleMe } from '~/types';

/**
 * Return a preconfigured callback function to convert titles to the proper case.
 */
export const useTitle = ([...overrides]: string[] = []): TitleMe => {
  const { titleOverrides } = useConfig();
  const special = [...titleOverrides, ...overrides];
  const callback = (text: string) => {
    if (typeof text !== 'string') {
      return '';
    }
    return zeitTitle(text, { special });
  };
  return useCallback(callback, [...special]);
};
