import { createContext, useContext } from "react";

import type { TFormModelTrial } from "~/types";
import type { PartnerLayoutProps } from "./types";

export type PartnerContextType = Omit<PartnerLayoutProps, "trialForm"> & {
  fields: TFormModelTrial;
};

const PartnerContext = createContext<PartnerContextType>({} as PartnerContextType);

export const { Provider: PartnerContextProvider } = PartnerContext;

export const usePartnerCtx = (): PartnerContextType => useContext(PartnerContext);
