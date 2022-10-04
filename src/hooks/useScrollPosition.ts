import { useWindowScroll } from "react-use";

export type UseScrollPositionCallback = (p: { x: number; y: number }) => void;

export function useScrollPosition(callback: UseScrollPositionCallback) {
  const { x, y } = useWindowScroll();
  callback({ x, y });
}
