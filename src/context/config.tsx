import { createContext, useContext, useRef } from "react";
import type { MutableRefObject } from "react";

import type { ConfigContextType, ConfigProviderProps } from "./types";

const ConfigContext = createContext<MutableRefObject<ConfigContextType>>(
  {} as MutableRefObject<ConfigContextType>,
);

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { globalConfig, docsGroups, testimonials, children } = props;

  const config = useRef<ConfigContextType>({
    ...globalConfig,
    testimonials,
    docsGroups,
  });

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): ConfigContextType => {
  const ctx = useContext<MutableRefObject<ConfigContextType>>(ConfigContext);
  return ctx.current;
};
