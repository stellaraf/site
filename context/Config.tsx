import { createContext, useContext, useMemo } from 'react';

import type { IGlobalConfigCtx, IConfigProvider } from './types';

const ConfigContext = createContext<IGlobalConfigCtx>(Object());

export const ConfigProvider = (props: IConfigProvider) => {
  const { globalConfig, children } = props;
  const value = useMemo<IGlobalConfigCtx>(() => globalConfig, [globalConfig]);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): IGlobalConfigCtx => useContext(ConfigContext);
