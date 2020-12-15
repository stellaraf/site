import { useMemo } from 'react';

export function useBooleanValue<T extends any = any, F extends any = any>(
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
