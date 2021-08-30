import { QueryClientProvider, QueryClient } from 'react-query';
import { TitleCaseProvider } from 'use-title-case';
import { UIProvider } from './ui';
import { ConfigProvider } from './config';

import type { IProvider } from './types';

const queryClient = new QueryClient();

export const Provider: React.FC<IProvider> = (props: IProvider) => {
  const { children, appConfig, docsGroups, testimonials, quote } = props;
  const { theme, ...globalConfig } = appConfig;

  return (
    <ConfigProvider
      quote={quote}
      docsGroups={docsGroups}
      globalConfig={globalConfig}
      testimonials={testimonials}
    >
      <UIProvider theme={theme}>
        <TitleCaseProvider overrides={globalConfig.titleOverrides}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </TitleCaseProvider>
      </UIProvider>
    </ConfigProvider>
  );
};

export { useConfig } from './config';
export { useTheme } from './ui';
export { useColorMode, useColorValue } from './ui';
