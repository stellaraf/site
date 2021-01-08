import { createState, useState } from '@hookstate/core';
import { useMouseTrap } from './useMouseTrap';

import type { StateMethods } from '@hookstate/core';

const rickRollState = createState<boolean>(false);

/**
 * Track special Dave Barrett state
 * @see ❤️
 */
export const useRickRoll = (): [boolean, StateMethods<boolean>['set']] => {
  const state = useState<boolean>(rickRollState);

  useMouseTrap(
    'n e v e r g o n n a',
    () => {
      state.set(p => !p);
    },
    'keyup',
  );

  return [state.value, state.set];
};
