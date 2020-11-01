import type { GeoPoint } from './content';

export interface ITestLocation extends GeoPoint {
  elapsed: number;
  best: boolean;
  done: boolean;
}

export type ITestResults = ITestLocation[];

export type Locations = GeoPoint[];

export type TOptionalGeoPoint = ITestResults | null;
