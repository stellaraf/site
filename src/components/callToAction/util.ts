import { useRef, useCallback } from 'react';
import type { TActions } from '~/types';

/**
 * Hook to randomize the actions & limit the number of actions returned based on the limit argument.
 * @param actions Input actions
 * @param limit Limit number of returned actions.
 */
export function useRandomActions(actions: TActions[], limit: number): TActions[] {
  const sorter = useCallback(() => Math.random() - Math.random(), []);
  const randomActionsRef = useRef(() => actions.sort(sorter).slice(0, limit));
  return randomActionsRef.current();
}
