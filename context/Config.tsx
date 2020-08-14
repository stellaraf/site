import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import siteConfig from '../siteConfig';

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const value = useMemo(() => siteConfig);
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
