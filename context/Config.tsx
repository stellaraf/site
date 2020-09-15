import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { GlobalConfig } from 'site/types';

interface ConfigProviderProps {
  globalConfig: GlobalConfig;
  children?: ReactNode;
}

const ConfigContext = createContext(null);

export const ConfigProvider = ({ globalConfig, children }: ConfigProviderProps) => {
  const value = useMemo(() => globalConfig, [globalConfig]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): GlobalConfig => useContext(ConfigContext);
