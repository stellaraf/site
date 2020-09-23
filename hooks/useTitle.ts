import { useCallback } from 'react';
import zeitTitle from 'title';
import { useConfig } from 'site/context';

import type { TitleMe } from 'site/types';

/**
 * Return a preconfigured callback function to convert titles to the proper case.
 */
export const useTitle = ([...overrides]: string[] = []): TitleMe => {
  const { titleOverrides } = useConfig();
  const special = [...titleOverrides, ...overrides];
  const callback = (text: string) => zeitTitle(text, { special });
  return useCallback(callback, [...special]);
};
