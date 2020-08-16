import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useHeaderLogo } from 'site/styles';
import type { MutableRefObject } from 'react';

export const useNavLogo = (logoRef: MutableRefObject<HTMLElement>) => {
  const show = useHeaderLogo();
  const effect = () => {
    const { top } = logoRef.current.getBoundingClientRect();
    if (top < 0) {
      show.set(true);
    }
    if (top > 0 && show.value) {
      show.set(false);
    }
  };
  return useScrollPosition(effect, [logoRef]);
};
