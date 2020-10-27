import type { GeoPoint } from 'site/types';

export type TOptionalGeoPoint = ITestResult | null;

export interface ITestLocation extends GeoPoint {
  elapsed: number;
  best: boolean;
}

export type TOptionalLocation = ITestLocation | null;
export type ITestResult = ITestLocation[];
export type Locations = GeoPoint[];
