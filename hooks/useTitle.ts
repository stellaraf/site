import { useCallback } from 'react';
import zeitTitle from 'title';
import { useConfig } from 'site/context';

type TitleMe = (t: string) => string;

export const useTitle = (...special: string[]): TitleMe => {
  const { titleOverrides } = useConfig();
  return useCallback(text => zeitTitle(text, { special: [...titleOverrides, ...special] }), [
    titleOverrides,
    special,
  ]);
};
