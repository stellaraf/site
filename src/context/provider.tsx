import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { TitleCaseProvider } from "use-title-case";

import { ConfigProvider } from "./config";
import { UIProvider } from "./ui";

import type { ProviderProps } from "./types";

const queryClient = new QueryClient();

export const Provider = (props: ProviderProps) => {
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
