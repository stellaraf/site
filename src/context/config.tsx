import {
  createContext,
  useContext,
  // useMemo,
  useRef,
} from "react";

import type { MutableRefObject } from "react";
import type { IGlobalConfigCtx, IConfigProvider } from "./types";

const ConfigContext = createContext<MutableRefObject<IGlobalConfigCtx>>(
  {} as MutableRefObject<IGlobalConfigCtx>,
);

export const ConfigProvider = (props: IConfigProvider): JSX.Element => {
  const { globalConfig, docsGroups, testimonials, children } = props;

  const config = useRef<IGlobalConfigCtx>({ ...globalConfig, testimonials, docsGroups });

  // const value = useMemo<IGlobalConfigCtx>(
  //   () => ({ ...globalConfig, testimonials, docsGroups }),
  //   [],
  // );

  // return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

// export const useConfig = (): IGlobalConfigCtx => useContext<IGlobalConfigCtx>(ConfigContext);

export const useConfig = (): IGlobalConfigCtx => {
  const ctx = useContext<MutableRefObject<IGlobalConfigCtx>>(ConfigContext);
  return ctx.current;
};
