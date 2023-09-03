import { atom, useAtom } from "jotai";

import { useKeySequence } from "./use-key-sequence";

type KonamiReturn = [boolean, () => void];

const konamiAtom = atom(false);

/**
 * Custom hook for detecting when the konami combination is pressed from anywhere within the site.
 */
export function useKonami(): KonamiReturn {
  const [isOpen, setOpen] = useAtom(konamiAtom);
  const toggle = () => setOpen(prev => !prev);
  useKeySequence(
    "arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright b a",
    toggle,
  );
  return [isOpen, toggle];
}
