import { createState, useState } from '@hookstate/core';
import { useMouseTrap } from './useMouseTrap';

const konamiState = createState<boolean>(false);

export const useKonami = (): boolean => {
  const state = useState<boolean>(konamiState);
  useMouseTrap(
    'up up down down left right left right b a',
    () => {
      state.set(p => !p);
    },
    'keyup',
  );
  return state.value;
};
