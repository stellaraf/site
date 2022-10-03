import create from 'zustand';
import type { SetState } from 'zustand';

type AvatarState = {
  current: number;
  setCurrent: (n: number) => void;
};

type AvatarReturn = [number, (n: number) => void];

const useStore = create<AvatarState>((set: SetState<AvatarState>) => ({
  current: 0,
  setCurrent(current: number): void {
    set({ current });
  },
}));

/**
 * Get/set the currently open avatar/bio.
 */
export function useCurrent(): AvatarReturn {
  const current = useStore(state => state.current);
  const setCurrent = useStore(state => state.setCurrent);
  return [current, setCurrent];
}
