import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { SetState } from 'zustand';

type Banner = {
  /**
   * `true` if the banner has been acknowledged, `false otherwise`.
   */
  acknowledged: boolean;

  /**
   * Update the `visible` state property.
   */
  setAcknowledged: (visibility: boolean) => void;
};

type BannerReturn = [boolean, (v: boolean) => void];

const useStore = create<Banner>(
  persist(
    (set: SetState<Banner>) => ({
      acknowledged: false,
      setAcknowledged(acknowledged: boolean) {
        set({ acknowledged });
      },
    }),
    { name: 'stellar-privacy-agreement' },
  ),
);

/**
 * Custom hook to manage the GDPR/privacy banner.
 */
export function useBanner(): BannerReturn {
  const state = useStore(state => state.acknowledged);
  const setState = useStore(state => state.setAcknowledged);
  return [state, setState];
}
