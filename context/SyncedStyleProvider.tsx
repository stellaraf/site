import { StylesProvider, useMultiStyleConfig } from '@chakra-ui/core';
import { useSyncedStyleVariant } from 'site/styles';
import type { SyncedStyleProviderProps } from 'site/types';

export const SyncedStyleProvider = (props: SyncedStyleProviderProps) => {
  const variant = useSyncedStyleVariant();
  const styles = useMultiStyleConfig('SyncedStyles', { variant: variant.value });
  return <StylesProvider value={styles}>{props.children}</StylesProvider>;
};
