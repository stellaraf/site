import { atom, useRecoilState } from 'recoil';

const styleVariantAtom = atom({ key: 'styleVariant', default: 0 });

type StyleVariantReturn = [number, (n: number) => void];

export function useSyncedStyleVariant(): StyleVariantReturn {
  return useRecoilState(styleVariantAtom);
}
