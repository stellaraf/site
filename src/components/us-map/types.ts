import type { BoxProps, PopoverContentProps } from "@chakra-ui/react";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { MarkerProps } from "react-simple-maps";
import type { CloudLocation } from "~/queries";

export interface CloudMeasurement extends CloudLocation {
  elapsed: number;
  best: boolean;
  done: boolean;
}

export interface MapMarkerProps extends MarkerProps {
  color?: string;
  best?: boolean;
}

export interface LocationProps extends Omit<PopoverContentProps, "color"> {
  color?: string;
  loc: CloudMeasurement;
}

export interface USMapProps extends BoxProps {
  geoData: Dict;
  mapColor: string;
  markerColor?: string;
}

export interface LatencyProps {
  location: Nullable<CloudMeasurement>;
}

export interface FetcherArgs {
  id: string;
  url: string;
  controller: AbortController;
  debug?: boolean;
  timeout: number;
}

export type UseDataCenterReturn = Omit<QueryObserverResult, "refetch"> & {
  execute(): void;
};
