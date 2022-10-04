import { useMemo } from 'react';

export function useBooleanValue<T = unknown, F = unknown>(
  track: boolean,
  ifTrue: T,
  ifFalse: F,
): T | F {
  return useMemo(() => {
    if (track) {
      return ifTrue;
    } else {
      return ifFalse;
    }
  }, [track]);
}
