import { createContext, useContext } from "react";

import type { Page } from "~/queries";

const PartnerContext = createContext<Page>({} as Page);

export const { Provider: PartnerContextProvider } = PartnerContext;

export const usePartnerCtx = (): Page => useContext(PartnerContext);
