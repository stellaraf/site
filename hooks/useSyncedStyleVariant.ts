import create from 'zustand';

import type { SetState } from 'zustand';

type StyleVariant = {
  variant: number;
  setVariant: (variant: number) => void;
};

type StyleVariantReturn = [number, (n: number) => void];

const useStore = create<StyleVariant>((set: SetState<StyleVariant>) => ({
  variant: 0,
  setVariant(variant: number): void {
    set({ variant });
  },
}));

export function useSyncedStyleVariant(): StyleVariantReturn {
  const variant = useStore(state => state.variant);
  const setVariant = useStore(state => state.setVariant);
  return [variant, setVariant];
}
