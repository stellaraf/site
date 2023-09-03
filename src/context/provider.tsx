import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { TitleCaseProvider } from "use-title-case";

import { ConfigProvider } from "./config";
import { DraftProvider } from "./draft";
import { UIProvider } from "./ui";

import type { ProviderProps } from "./types";

const queryClient = new QueryClient();

export const Provider = (props: ProviderProps) => {
  const { children, config, theme, docsGroups, draft } = props;

  return (
    <ConfigProvider config={config} docsGroups={docsGroups}>
      <JotaiProvider>
        <TitleCaseProvider overrides={config.titleOverrides}>
          <UIProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <DraftProvider initial={draft}>{children}</DraftProvider>
            </QueryClientProvider>
          </UIProvider>
        </TitleCaseProvider>
      </JotaiProvider>
    </ConfigProvider>
  );
};
