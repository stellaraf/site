import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type AvatarReturn = [number, (n: number) => void];

const currentAvatarAtom = atom({ key: "currentAvatar", default: 0 });

export const useCurrent = (): AvatarReturn[0] => useRecoilValue(currentAvatarAtom);
export const useSetCurrent = (): AvatarReturn[1] => useSetRecoilState(currentAvatarAtom);
