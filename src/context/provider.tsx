import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { TitleCaseProvider } from "use-title-case";

import { ConfigProvider } from "./config";
import { UIProvider } from "./ui";

import type { ProviderProps } from "./types";

const queryClient = new QueryClient();

export const Provider = (props: ProviderProps) => {
  const { children, config, theme, docsGroups, fonts } = props;

  return (
    <ConfigProvider config={config} docsGroups={docsGroups}>
      <RecoilRoot>
        <UIProvider theme={theme} fonts={fonts}>
          <TitleCaseProvider overrides={config.titleOverrides}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </TitleCaseProvider>
        </UIProvider>
      </RecoilRoot>
    </ConfigProvider>
  );
};
