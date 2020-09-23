import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { GlobalConfigContext, ConfigProviderProps } from 'site/types';

const ConfigContext = createContext<GlobalConfigContext>(Object());

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { globalConfig, children } = props;
  const value = useMemo<GlobalConfigContext>(() => globalConfig, [globalConfig]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): GlobalConfigContext => useContext(ConfigContext);
