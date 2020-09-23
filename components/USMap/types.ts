import type { BoxProps } from '@chakra-ui/core';
import type { MarkerProps as RSMMarkerProps } from 'react-simple-maps';
import type { GeoPoint } from 'site/types';

export interface MarkerProps extends RSMMarkerProps {
  color?: string;
}

export type Locations = GeoPoint[];

export interface LocationProps extends Omit<BoxProps, 'color'> {
  color?: string;
  loc: GeoPoint;
}

export interface MapProps extends BoxProps {
  geoData: object;
  locations: Locations;
  mapColor: string;
  markerColor?: string;
}
