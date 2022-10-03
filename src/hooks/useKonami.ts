import create from 'zustand';
import { useMouseTrap } from './useMouseTrap';

import type { SetState, GetState } from 'zustand';

type KonamiState = {
  /**
   * `true` if the combination has been pressed and is active, `false otherwise`.
   */
  ready: boolean;
  /**
   * Toggle the `ready` state to the opposite of its current value.
   */
  toggle: () => void;
};

const useStore = create<KonamiState>((set: SetState<KonamiState>, get: GetState<KonamiState>) => ({
  ready: false,
  toggle: () => {
    const { ready } = get();
    set({ ready: !ready });
  },
}));

/**
 * Custom hook for detecting when the konami combination is pressed from anywhere within the site.
 */
export function useKonami(): boolean {
  const state = useStore(state => state.ready);
  const toggle = useStore(state => state.toggle);
  useMouseTrap('up up down down left right left right b a', toggle, 'keyup');
  return state;
}
