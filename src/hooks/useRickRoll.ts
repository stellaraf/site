import create from 'zustand';
import { useMouseTrap } from './useMouseTrap';

import type { SetState, GetState } from 'zustand';

type Astley = {
  /**
   * `true` if the combination has been pressed and is active, `false otherwise`.
   */
  isOpen: boolean;

  /**
   * Open the model.
   */
  open: () => void;

  /**
   * Close the modal.
   */
  close: () => void;
};

type AstleyReturn = [boolean, () => void];

const useStore = create<Astley>((set: SetState<Astley>, get: GetState<Astley>) => ({
  isOpen: false,
  open: () => {
    const { isOpen } = get();
    if (!isOpen) {
      set({ isOpen: true });
    }
  },
  close(): void {
    set({ isOpen: false });
  },
}));

/**
 * Track special Dave Barrett state.
 *
 * @see ❤️
 */
export function useRickRoll(): AstleyReturn {
  const state = useStore(state => state.isOpen);
  const open = useStore(state => state.open);
  const close = useStore(state => state.close);
  useMouseTrap('n e v e r g o n n a', open, 'keyup');
  return [state, close];
}
