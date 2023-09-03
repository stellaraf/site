import { useEffect } from "react";

import useWindowScroll from "react-use/lib/useWindowScroll";

type UseScrollPositionCallback = (p: { x: number; y: number }) => void;

export function useScrollPosition(callback: UseScrollPositionCallback): void {
  const state = useWindowScroll();
  useEffect(() => {
    callback(state);
  }, [state]);
}
