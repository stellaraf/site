import { useRef as ReactUseRef } from 'react';

/**
 * Convenience wrapper around React.useRef
 */
export function useRef<T>(I: any = Object()) {
  return ReactUseRef<T>(I);
}
