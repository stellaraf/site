import type { BoxProps, UseDisclosureReturn } from '@chakra-ui/core';
import type { MarkerProps } from 'react-simple-maps';
import type { GeoPoint, IMeasuredGeoPoint } from 'site/types';

export interface IMapMarker extends MarkerProps {
  color?: string;
  best?: boolean;
}

export type Locations = GeoPoint[];

export interface LocationProps extends Omit<BoxProps, 'color'> {
  color?: string;
  loc: GeoPoint;
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
  location: GeoPoint;
  index: number;
}

export interface ITestLocation extends GeoPoint {
  elapsed: number;
  best: boolean;
}

export type TOptionalLocation = ITestLocation | null;

export type ITestResult = ITestLocation[];

export interface ILatency {
  elapsed: ITestLocation['elapsed'];
}
