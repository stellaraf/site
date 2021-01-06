import { QueryClientProvider, QueryClient } from 'react-query';
import { UIProvider } from './ui';
import { ConfigProvider } from './config';

import type { IProvider } from './types';

const queryClient = new QueryClient();

export const Provider: React.FC<IProvider> = (props: IProvider) => {
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

export { useConfig } from './config';
export { useTheme } from './ui';
export { useColorMode, useColorValue } from './ui';
