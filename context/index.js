import * as React from 'react';
import { ThemeProvider } from './Theme';
import { ConfigProvider } from './Config';
import { MediaProvider } from './Media';
import { ColorModeProvider } from './ColorMode';

export { useMedia } from './Media';
export { useGlobalState } from './GlobalState';
export { useConfig } from './Config';
export { useTheme } from './Theme';
export { useColorMode } from './ColorMode';

export const Provider = ({ children }) => (
  <ConfigProvider>
    <ThemeProvider>
      <ColorModeProvider>
        <MediaProvider>{children}</MediaProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </ConfigProvider>
);
