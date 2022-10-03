import { createContext, useContext } from 'react';

import type { IDocsCtx } from './types';

export const DocsCtx = createContext<IDocsCtx>({} as IDocsCtx);

export const useDocsCtx = (): IDocsCtx => useContext(DocsCtx);
