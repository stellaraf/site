import { createContext, useContext } from 'react';

import type { IDocsCtx } from './types';

export const DocsCtx = createContext<IDocsCtx>(Object());

export const useDocsCtx = () => useContext(DocsCtx);
