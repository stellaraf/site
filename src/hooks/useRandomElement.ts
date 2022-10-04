import { useMemo, useRef } from 'react';

/**
 * Hook to return a random element from an array.
 *
 * @param array Array from which to select an element.
 * @param deps Optional dependency array.
 * @returns Random array element
 *
 * @example
 * ```tsx
 * export const Component = () => {
 *   const element = useRandomElement([1, 2, 3]);
 *   return <div>{element}</div>;
 * }
 * ```
 */
export function useRandomElement<E>(array: Array<E>, deps: unknown[] = []): E {
  const idxCb = useRef(() => Math.floor(Math.random() * array.length));
  const element = useMemo(() => array[idxCb.current()], deps);
  return element;
}
