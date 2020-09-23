import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useHeaderLogo } from 'site/styles';
import type { ReactRef } from 'site/types';

/**
 * Show or hide the navbar logo based on scroll position.
 */
export const useNavLogo = (logoRef: ReactRef): void => {
  const show = useHeaderLogo();
  const effect = () => {
    const { top } = logoRef.current.getBoundingClientRect();
    if (top < 0 && !show.value) {
      show.set(true);
    }
    if (top > 0 && show.value) {
      show.set(false);
    }
  };
  return useScrollPosition(effect, [logoRef]);
};
