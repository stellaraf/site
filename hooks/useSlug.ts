import { useMemo } from 'react';
import { slug } from 'site/util';

export const useSlug = (original: string, [...deps]) =>
  useMemo(() => slug(original, '', ''), [deps]);
