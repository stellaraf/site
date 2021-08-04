import create from 'zustand';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import type { SetState, GetState } from 'zustand';

type NavLogo = {
  /**
   * `true` if the nav logo should be visible, `false otherwise`.
   */
  show: boolean;
  /**
   * Determine if the logo should be visible and update `show` accordingly.
   */
  setVisibility: (top: number) => void;
};

const useStore = create<NavLogo>((set: SetState<NavLogo>, get: GetState<NavLogo>) => ({
  show: false,
  setVisibility(top: number) {
    const { show } = get();
    if (top < 0 && !show) {
      set({ show: true });
    }
    if (top > 0 && show) {
      set({ show: false });
    }
  },
}));

/**
 * Global state value for nav logo visibility.
 */
export const useNavLogoState = (): NavLogo['show'] => useStore(state => state.show);

/**
 * Show or hide the navbar logo based on scroll position.
 *
 * @param logoRef Ref to the logo DOM element.
 */
export function useNavLogo<E extends SVGElement>(logoRef: ReactRef<E>): void {
  const setVisibility = useStore(state => state.setVisibility);

  function effect() {
    if (typeof logoRef.current.getBoundingClientRect === 'function') {
      const { top } = logoRef.current.getBoundingClientRect();
      setVisibility(top);
    }
  }
  useScrollPosition(effect, [logoRef]);
}
