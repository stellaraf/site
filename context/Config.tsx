import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { GlobalConfig, ConfigProviderProps } from 'site/types';

const ConfigContext = createContext(null);

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { globalConfig, children } = props;
  const value = useMemo(() => globalConfig, [globalConfig]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): GlobalConfig => useContext(ConfigContext);
