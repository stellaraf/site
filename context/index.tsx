import * as React from 'react';
import { ThemeProvider } from './Theme';
import { ConfigProvider } from './Config';
import { MediaProvider } from './Media';
import { ColorModeProvider } from './ColorMode';
import type { GlobalConfig, CustomTheme } from 'site/util';

export { useMedia } from './Media';
export { useConfig } from './Config';
export { useTheme } from './Theme';
export { useColorMode } from './ColorMode';

interface ProviderProps {
  globalConfig: GlobalConfig;
  theme: CustomTheme;
  children: any;
}

export const Provider = ({ globalConfig, theme, children }: ProviderProps) => (
  <ConfigProvider globalConfig={globalConfig}>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <MediaProvider>{children}</MediaProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </ConfigProvider>
);
