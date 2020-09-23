import mousetrap from 'mousetrap';
import { useEffect } from 'react';

interface ExtendedKeyboardEvent extends KeyboardEvent {
  returnValue: boolean; // IE returnValue
}
type BindCallback = (e: ExtendedKeyboardEvent, c: string) => any;

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

  /**
   * Unbind after mount.
   */
  const unbind = () => {
    mousetrap.unbind(keys);
  };

  useEffect(() => {
    mousetrap.bind(keys, binder, eventType);
    return unbind;
  }, [keys]);
}
