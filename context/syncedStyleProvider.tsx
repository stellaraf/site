import { StylesProvider, useMultiStyleConfig } from '@chakra-ui/react';
import { useSyncedStyleVariant } from '~/styles';

import type { ISyncedStyleProvider } from './types';

export const SyncedStyleProvider: React.FC<ISyncedStyleProvider> = (
  props: ISyncedStyleProvider,
) => {
  const variant = useSyncedStyleVariant();
  const styles = useMultiStyleConfig('SyncedStyles', { variant: variant.value });
  return <StylesProvider value={styles}>{props.children}</StylesProvider>;
};
