import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { GlobalConfig } from 'site/util/content';

interface ConfigProviderProps {
  globalConfig: GlobalConfig;
  children: any;
}

const ConfigContext = createContext(null);

export const ConfigProvider = ({ globalConfig, children }: ConfigProviderProps) => {
  const value = useMemo(() => globalConfig, [globalConfig]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): GlobalConfig => useContext(ConfigContext);
