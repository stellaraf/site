import { useState, useEffect } from 'react';

interface UseSSR {
  /** `true` if render is taking place on the client, `false` if not. */
  isClient: boolean;
  /** `true` if render is taking place on the server, `false` if not. */
  isServer: boolean;
}

/**
 * Determine if the current render is taking place on the client or server side.
 */
export function useSSR(): UseSSR {
  const [isClient, setClient] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClient(true);
    }
  }, []);
  return { isClient, isServer: !isClient };
}
