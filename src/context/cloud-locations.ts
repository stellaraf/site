import { createContext, useContext } from "react";

import type { CloudLocations } from "~/queries";

const CloudLocationsCtx = createContext<CloudLocations>([]);

export const CloudLocationsProvider = CloudLocationsCtx.Provider;

export const useCloudLocations = (): CloudLocations =>
  useContext<CloudLocations>(CloudLocationsCtx);
