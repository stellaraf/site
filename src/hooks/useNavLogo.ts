import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useScrollPosition } from "./useScrollPosition";

const navLogoAtom = atom({ key: "navLogo", default: false });

export const useNavLogoState = (): boolean => useRecoilValue(navLogoAtom);

/**
 * Show or hide the navbar logo based on scroll position.
 *
 * @param logoRef Ref to the logo DOM element.
 */
export function useNavLogo<E extends SVGElement>(logoRef: ReactRef<E>): void {
  const setShow = useSetRecoilState(navLogoAtom);

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
