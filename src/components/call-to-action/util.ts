import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

/**
 * Hook to randomize the actions & limit the number of actions returned based on the limit argument.
 *
 * @param actions Input actions
 * @param limit Limit number of returned actions.
 */
export function useRandomActions<A>(actions: A[], limit: number): A[] {
  const { asPath } = useRouter();
  const [randomActions, setRandomActions] = useState<A[]>([]);
  const sorter = useCallback(() => Math.random() - Math.random(), []);
  useEffect(() => {
    const random = actions.sort(sorter).slice(0, limit);
    setRandomActions(random);
  }, [asPath]);
  return randomActions;
}
