import * as React from 'react';
import { UIProvider } from './UI';
import { ConfigProvider } from './Config';
import { MediaProvider } from './Media';
import type { ProviderProps } from 'site/types';

export { useMedia } from './Media';
export { useConfig } from './Config';
export { useTheme } from './UI';
export { useColorMode, useColorValue } from './UI';

export const Provider = (props: ProviderProps) => {
  const { children, appConfig } = props;
  const { theme, ...globalConfig } = appConfig;
  return (
    <ConfigProvider globalConfig={globalConfig}>
      <UIProvider theme={theme}>
        <MediaProvider>{children}</MediaProvider>
      </UIProvider>
    </ConfigProvider>
  );
};
