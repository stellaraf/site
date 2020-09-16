import type { GeoPoint } from 'site/util';

export interface MarkerProps {
  color: string;
  [k: string]: any;
}

export interface MapProps {
  geoData: object;
  locations: GeoPoint[];
  mapColor: string;
  markerColor: string;
  [k: string]: any;
}
