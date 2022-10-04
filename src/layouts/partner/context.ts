import { createContext, useContext } from "react";

import type { IPartnerContext } from "./types";

const PartnerContext = createContext<IPartnerContext>({} as IPartnerContext);
export const { Provider: PartnerContextProvider } = PartnerContext;
export const usePartnerCtx = (): IPartnerContext => useContext(PartnerContext);
