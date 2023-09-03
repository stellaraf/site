import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { atom, useSetAtom, useAtomValue } from "jotai";

import { objectHasProperty } from "~/lib";

import type { Employees } from "~/queries";

type AvatarReturn = [number, (n: number) => void];

const currentAvatarAtom = atom(0);

export const useCurrent = (): AvatarReturn[0] => useAtomValue(currentAvatarAtom);
export const useSetCurrent = (): AvatarReturn[1] => useSetAtom(currentAvatarAtom);

interface UseEmployeeQueryProps {
  employees: Employees;
}

export function useEmployeeQuery(props: UseEmployeeQueryProps): [boolean, () => void] {
  const [isOpen, setOpen] = useState(false);
  const { employees } = props;
  const { query } = useRouter();
  const setCurrent = useSetCurrent();

  const reset = useCallback(() => {
    setOpen(false);
  }, [query.e]);

  useEffect(() => {
    if (objectHasProperty(query, "e")) {
      for (const [idx, employee] of employees.entries()) {
        if (employee.name === query.e) {
          setCurrent(idx);
          setOpen(true);
          break;
        }
      }
    }
  }, [query.e]);

  return [isOpen, reset];
}
