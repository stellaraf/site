import { createContext, useContext } from "react";

import type { PartnerLayoutProps } from "./types";
import type { TFormModelTrial } from "~/types";

type PartnerContextType = Omit<PartnerLayoutProps, "trialForm"> & {
  fields: TFormModelTrial;
};

const PartnerContext = createContext<PartnerContextType>({} as PartnerContextType);

export const { Provider: PartnerContextProvider } = PartnerContext;

export const usePartnerCtx = (): PartnerContextType => useContext(PartnerContext);
