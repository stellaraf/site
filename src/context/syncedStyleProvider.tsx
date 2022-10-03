import { createStylesContext, useMultiStyleConfig } from '@chakra-ui/react';
import { useSyncedStyleVariant } from '~/hooks';

import type { ISyncedStyleProvider } from './types';

const [StylesProvider] = createStylesContext('SyncedStyles');

export const SyncedStyleProvider: React.FC<ISyncedStyleProvider> = (
  props: ISyncedStyleProvider,
) => {
  const [variant] = useSyncedStyleVariant();
  const styles = useMultiStyleConfig('SyncedStyles', { variant });
  return <StylesProvider value={styles}>{props.children}</StylesProvider>;
};
