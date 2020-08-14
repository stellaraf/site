import * as React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

const GlobalStateContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const [headerStyle, setHeaderStyle] = useState(null);
  const [headerLogo, setHeaderLogo] = useState(false);
  const value = useMemo(() => ({ headerStyle, setHeaderStyle, headerLogo, setHeaderLogo }));
  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = () => useContext(GlobalStateContext);
