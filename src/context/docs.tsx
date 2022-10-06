import { createContext, useContext } from "react";

import type { DocsContextType } from "./types";

export const DocsCtx = createContext<DocsContextType>({} as DocsContextType);

export const useDocsCtx = (): DocsContextType => useContext(DocsCtx);
