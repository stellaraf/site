import * as React from 'react';
import { ThemeProvider } from './Theme';
import { ConfigProvider } from './Config';
import { MediaProvider } from './Media';
import { ColorModeProvider } from './ColorMode';

import type { GlobalConfig } from 'site/util/content';

export { useMedia } from './Media';
export { useGlobalState } from './GlobalState';
export { useConfig } from './Config';
export { useTheme } from './Theme';
export { useColorMode } from './ColorMode';

interface ProviderProps {
  globalConfig: GlobalConfig;
  children: any;
}

export const Provider = ({ globalConfig, children }: ProviderProps) => (
  <ConfigProvider globalConfig={globalConfig}>
    <ThemeProvider>
      <ColorModeProvider>
        <MediaProvider>{children}</MediaProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </ConfigProvider>
);
