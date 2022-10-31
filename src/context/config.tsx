import { createContext, useContext, useRef } from "react";
import type { MutableRefObject } from "react";

import type { ConfigContextType, ConfigProviderProps } from "./types";

const ConfigContext = createContext<MutableRefObject<ConfigContextType>>(
  {} as MutableRefObject<ConfigContextType>,
);

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { config, docsGroups, children } = props;

  const value = useRef<ConfigContextType>({ ...config, docsGroups });

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): ConfigContextType => {
  const ctx = useContext<MutableRefObject<ConfigContextType>>(ConfigContext);
  return ctx.current;
};
