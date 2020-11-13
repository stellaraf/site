import type { BoxProps, UseDisclosureReturn } from '@chakra-ui/react';
import type { MarkerProps } from 'react-simple-maps';
import { State } from '@hookstate/core';
import type { ITestLocation, Locations, IMeasuredGeoPoint } from 'site/types';

export interface IMapMarker extends MarkerProps {
  color?: string;
  best?: boolean;
}

export interface LocationProps extends Omit<BoxProps, 'color'> {
  color?: string;
  loc: Locations[number];
}

export interface IUSMap extends BoxProps {
  geoData: object;
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

export interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

export interface TFetcher {
  id: string;
  url: string;
  controller: AbortController;
  debug?: boolean;
  timeout: number;
}
