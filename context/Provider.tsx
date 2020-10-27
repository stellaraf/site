import { UIProvider } from './UI';
import { ConfigProvider } from './Config';
import type { IProvider } from './types';

export { useConfig } from './Config';
export { useTheme } from './UI';
export { useColorMode, useColorValue } from './UI';

export const Provider = (props: IProvider) => {
  const { children, appConfig } = props;
  const { theme, ...globalConfig } = appConfig;
  return (
    <ConfigProvider globalConfig={globalConfig}>
      <UIProvider theme={theme}>{children}</UIProvider>
    </ConfigProvider>
  );
};
