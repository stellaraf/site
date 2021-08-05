import type { BoxProps, PopoverContentProps } from '@chakra-ui/react';
import type { QueryObserverResult } from 'react-query';
import type { MarkerProps } from 'react-simple-maps';
import type { CloudMeasurement } from '~/types';

export interface IMapMarker extends MarkerProps {
  color?: string;
  best?: boolean;
}

export interface LocationProps extends Omit<PopoverContentProps, 'color'> {
  color?: string;
  loc: CloudMeasurement;
}

export interface IUSMap extends BoxProps {
  geoData: Dict;
  mapColor: string;
  markerColor?: string;
}

export interface ILatency {
  location: Nullable<CloudMeasurement>;
}

export interface TFetcher {
  id: string;
  url: string;
  controller: AbortController;
  debug?: boolean;
  timeout: number;
}

export type UseDataCenterReturn = Omit<QueryObserverResult, 'refetch'> & { execute(): void };
