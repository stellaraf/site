import { useEffect } from 'react';
import mousetrap from 'mousetrap';

interface ExtendedKeyboardEvent extends KeyboardEvent {
  returnValue: boolean; // IE returnValue
}
type BindCallback = (e: ExtendedKeyboardEvent, c: string) => void;

export function useMouseTrap(
  keys: string | string[],
  callback: BindCallback,
  eventType: string,
): void {
  /**
   * Safely bind to mousetrap.
   */
  const binder: BindCallback = (event, combo) => {
    if (typeof callback === 'function') {
      callback(event, combo);
    }
  };

  useEffect(() => {
    mousetrap.bind(keys, binder, eventType);
    return () => {
      // Unbind after mount.
      mousetrap.unbind(keys);
    };
  }, []);
}
