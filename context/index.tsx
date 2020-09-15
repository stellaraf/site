import * as React from 'react';
import { UIProvider } from './UI';
import { ConfigProvider } from './Config';
import { MediaProvider } from './Media';
import type { GlobalConfig, CustomTheme } from 'site/types';

export { useMedia } from './Media';
export { useConfig } from './Config';
export { useTheme } from './UI';
export { useColorMode, useColorValue } from './UI';

interface ProviderProps {
  globalConfig: GlobalConfig;
  theme: CustomTheme;
  children: any;
}

export const Provider = ({ globalConfig, theme, children }: ProviderProps) => (
  <ConfigProvider globalConfig={globalConfig}>
    <UIProvider theme={theme}>
      <MediaProvider>{children}</MediaProvider>
    </UIProvider>
  </ConfigProvider>
);
