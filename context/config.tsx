import { createContext, useContext, useMemo } from 'react';

import type { IDocsGroup } from '~/types';
import type { IGlobalConfigCtx, IConfigProvider } from './types';

function sortByWeight(prev: IDocsGroup, next: IDocsGroup) {
  const { sortWeight: prevWeight = 999 } = prev;
  const { sortWeight: nextWeight = 999 } = next;
  return prevWeight - nextWeight;
}

function sortByTitle(prev: IDocsGroup, next: IDocsGroup) {
  const { title: prevTitle } = prev;
  const { title: nextTitle } = next;
  return prevTitle > nextTitle ? 1 : -1;
}

const ConfigContext = createContext<IGlobalConfigCtx>({} as IGlobalConfigCtx);

export const ConfigProvider = (props: IConfigProvider): JSX.Element => {
  const { globalConfig, docsGroups, testimonials, children, quote } = props;

  const value = useMemo<IGlobalConfigCtx>(
    (): IGlobalConfigCtx => ({
      ...globalConfig,
      testimonials,
      quote,
      docsGroups: docsGroups.sort(sortByTitle).sort(sortByWeight),
    }),
    [globalConfig, docsGroups],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): IGlobalConfigCtx => useContext<IGlobalConfigCtx>(ConfigContext);
