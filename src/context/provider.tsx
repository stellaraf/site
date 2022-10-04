import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { TitleCaseProvider } from 'use-title-case';
import { UIProvider } from './ui';
import { ConfigProvider } from './config';

import type { IProvider } from './types';

const queryClient = new QueryClient();

export const Provider: React.FC<IProvider> = (props: IProvider) => {
  const { children, appConfig, docsGroups, testimonials } = props;
  const { theme, ...globalConfig } = appConfig;
  return (
    <ConfigProvider globalConfig={globalConfig} docsGroups={docsGroups} testimonials={testimonials}>
      <RecoilRoot>
        <UIProvider theme={theme}>
          <TitleCaseProvider overrides={globalConfig.titleOverrides}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </TitleCaseProvider>
        </UIProvider>
      </RecoilRoot>
    </ConfigProvider>
  );
};

export { useConfig } from './config';
export { useTheme } from './ui';
export { useColorMode, useColorValue } from './ui';
