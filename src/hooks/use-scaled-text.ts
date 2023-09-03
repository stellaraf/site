import { useMemo } from "react";

import useMeasure from "react-use/lib/useMeasure";

import type { UseMeasureRef } from "react-use/esm/useMeasure";

/**
 * Wrapper for useMeasure() which determines if a text element should be scaled down due to its
 * size relative to its parent's size.
 */
export function useScaledText<
  C extends HTMLElement = HTMLElement,
  T extends HTMLHeadingElement = HTMLHeadingElement,
>(deps: unknown[]): [UseMeasureRef<C>, UseMeasureRef<T>, boolean] {
  // Get a ref & state object for the containing element.
  const [containerRef, container] = useMeasure<C>();

  // Get a ref & state object for the text element.
  const [textRef, text] = useMeasure<T>();

  // Memoize the values.
  const textWidth = useMemo(() => text.width, [...deps, text.width !== 0]);
  const containerWidth = useMemo(() => container.width, [...deps, container.width]);

  // If the text element is the same size or larger than the container, it should be resized.
  const shouldResize = textWidth !== 0 && textWidth >= containerWidth;

  return [containerRef, textRef, shouldResize];
}
