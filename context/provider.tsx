import { TitleCaseProvider } from 'use-title-case';
import { UIProvider } from './ui';
import { ConfigProvider } from './config';

import type { IProvider } from './types';

export const Provider: React.FC<IProvider> = (props: IProvider) => {
  const { children, appConfig, docsGroups, testimonials } = props;
  const { theme, ...globalConfig } = appConfig;

  return (
    <ConfigProvider docsGroups={docsGroups} globalConfig={globalConfig} testimonials={testimonials}>
      <UIProvider theme={theme}>
        <TitleCaseProvider overrides={globalConfig.titleOverrides}>{children}</TitleCaseProvider>
      </UIProvider>
    </ConfigProvider>
  );
};

export { useConfig } from './config';
export { useTheme } from './ui';
export { useColorMode, useColorValue } from './ui';
