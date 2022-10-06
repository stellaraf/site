import { atom, useRecoilState } from "recoil";
import { useKeySequence } from "./use-key-sequence";

type AstleyReturn = [boolean, () => void];

const astleyAtom = atom({ key: "astley", default: false });

/**
 * Track special Dave Barrett state.
 *
 * @see ❤️
 */
export function useRickRoll(): AstleyReturn {
  const [isOpen, setOpen] = useRecoilState(astleyAtom);
  const open = () => !isOpen && setOpen(true);
  const close = () => isOpen && setOpen(false);
  useKeySequence("n e v e r g o n n a", open);
  return [isOpen, close];
}
