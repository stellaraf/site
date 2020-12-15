import { QueryClientProvider, QueryClient } from 'react-query';
import { UIProvider } from './UI';
import { ConfigProvider } from './Config';
import type { IProvider } from './types';

export { useConfig } from './Config';
export { useTheme } from './UI';
export { useColorMode, useColorValue } from './UI';

const queryClient = new QueryClient();

export const Provider = (props: IProvider) => {
  const { children, appConfig, docsGroups } = props;
  const { theme, ...globalConfig } = appConfig;
  return (
    <ConfigProvider globalConfig={globalConfig} docsGroups={docsGroups}>
      <UIProvider theme={theme}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </UIProvider>
    </ConfigProvider>
  );
};
