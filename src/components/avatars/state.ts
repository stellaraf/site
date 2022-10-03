import { atom, useRecoilState } from 'recoil';

type AvatarReturn = [number, (n: number) => void];

const currentAvatarAtom = atom({ key: 'currentAvatar', default: 0 });

export const useCurrent = (): AvatarReturn => useRecoilState(currentAvatarAtom);
