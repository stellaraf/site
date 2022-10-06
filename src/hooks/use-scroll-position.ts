import { useEffect } from "react";

import { useWindowScroll } from "react-use";

type UseScrollPositionCallback = (p: { x: number; y: number }) => void;

export function useScrollPosition(callback: UseScrollPositionCallback) {
  const state = useWindowScroll();
  useEffect(() => {
    callback(state);
  }, [state]);
}
