import type { GeoPoint } from './content';

export interface CloudMeasurement extends GeoPoint {
  elapsed: number;
  best: boolean;
  done: boolean;
}
