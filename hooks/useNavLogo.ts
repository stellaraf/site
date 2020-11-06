import { createState, useState } from '@hookstate/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const showNavLogoState = createState<boolean>(false);
export const useNavLogoState = () => useState(showNavLogoState);

/**
 * Show or hide the navbar logo based on scroll position.
 */
export const useNavLogo = (logoRef: ReactRef): void => {
  const headerLogo = useNavLogoState();

  const effect = () => {
    if (typeof logoRef.current.getBoundingClientRect === 'function') {
      const { top } = logoRef.current.getBoundingClientRect();
      if (top < 0 && !headerLogo.value) {
        headerLogo.set(true);
      }
      if (top > 0 && headerLogo.value) {
        headerLogo.set(false);
      }
    }
  };

  useScrollPosition(effect, [logoRef]);
};
