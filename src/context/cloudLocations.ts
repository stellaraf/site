import { createContext, useContext } from "react";

import type { GeoPoint } from "~/types";

const CloudLocationsCtx = createContext<GeoPoint[]>([]);

export const CloudLocationsProvider = CloudLocationsCtx.Provider;

export const useCloudLocations = (): GeoPoint[] => useContext<GeoPoint[]>(CloudLocationsCtx);
