import { useCallback } from "react";

import { atom, useSetAtom, useAtomValue } from "jotai";

import { useScrollPosition } from "./use-scroll-position";

const navLogoAtom = atom(false);

export const useNavLogoState = (): boolean => useAtomValue(navLogoAtom);

/**
 * Show or hide the navbar logo based on scroll position.
 *
 * @param logoRef Ref to the logo DOM element.
 */
export function useNavLogo<E extends SVGElement>(logoRef: React.MutableRefObject<E>): void {
  const setShow = useSetAtom(navLogoAtom);

  const setVisibility = useCallback(
    (top: number): void => {
      if (top < 0) {
        setShow(true);
      }
      if (top > 0) {
        setShow(false);
      }
    },
    [setShow],
  );

  const effect = () => {
    if (typeof logoRef.current.getBoundingClientRect === "function") {
      const { top } = logoRef.current.getBoundingClientRect();
      setVisibility(top);
    }
  };

  useScrollPosition(effect);
}
