import { useMemo } from 'react';
import { slug } from '~/util';

export const useSlug = (original: string, deps: unknown[] = []): string =>
  useMemo(() => slug(original, '', ''), deps);
