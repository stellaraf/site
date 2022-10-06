import { atom, useRecoilState } from "recoil";

import { useKeySequence } from "./use-key-sequence";

type KonamiReturn = [boolean, () => void];

const konamiAtom = atom({ key: "konami", default: false });

/**
 * Custom hook for detecting when the konami combination is pressed from anywhere within the site.
 */
export function useKonami(): KonamiReturn {
  const [isOpen, setOpen] = useRecoilState(konamiAtom);
  const open = () => !isOpen && setOpen(true);
  const close = () => isOpen && setOpen(false);
  useKeySequence(
    "arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright b a",
    open,
  );
  return [isOpen, close];
}
