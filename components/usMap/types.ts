import type { BoxProps, UseDisclosureReturn, PopoverContentProps } from '@chakra-ui/react';
import type { QueryObserverResult } from 'react-query';
import type { MarkerProps } from 'react-simple-maps';
import { State } from '@hookstate/core';
import type { ITestLocation, Locations, IMeasuredGeoPoint } from '~/types';

export interface IMapMarker extends MarkerProps {
  color?: string;
  best?: boolean;
}

export interface LocationProps extends Omit<PopoverContentProps, 'color'> {
  color?: string;
  loc: Locations[number];
}

export interface IUSMap extends BoxProps {
  geoData: Dict;
  mapColor: string;
  markerColor?: string;
  locations: IMeasuredGeoPoint[];
}

export interface IFinder extends UseDisclosureReturn {
  locations: Locations;
}

export interface ILocation {
  location: Locations[number];
  index: number;
}

export interface ILatency {
  locState: State<ITestLocation>;
}

export interface TFetcher {
  id: string;
  url: string;
  controller: AbortController;
  debug?: boolean;
  timeout: number;
}

export type UseDataCenterReturn = Omit<QueryObserverResult, 'refetch'> & { execute(): void };
