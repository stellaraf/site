import { createState, useState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

import type { TUseBannerReturn } from './types';

const ackState = createState<boolean>(false);

/**
 * Hook to manage the GDPR/privacy banner.
 */
export function useBanner(): TUseBannerReturn {
  const ack = useState<boolean>(ackState);

  if (typeof window !== 'undefined') {
    ack.attach(Persistence('stellar-privacy-agreement'));
  }

  return [ack.value, ack.set];
}
