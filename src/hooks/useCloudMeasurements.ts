import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { merge } from "merge-anything";
import { useCloudLocations } from "~/context";
import { all } from "~/util";

import type { GeoPoint, CloudMeasurement } from "~/types";

type PartialMeasurement = Pick<CloudMeasurement, "id"> & Partial<CloudMeasurement>;

interface CloudMeasurements {
  /**
   * Array of measurements.
   */
  measurements: CloudMeasurement[];

  /**
   * Get a measurement by ID.
   * @param id Measurement ID
   */
  getMeasurement: (id: string) => Nullable<CloudMeasurement>;

  /**
   * Get a measurement's array index by its ID property.
   *
   * @param id Measurement ID
   */
  getMeasurementIndex: (id: string) => Nullable<number>;

  /**
   * Populate cloud locations & initial measurement data.
   *
   * @param locations GeoPoints/Cloud locations from CMS.
   */
  addMeasurements: (locations: GeoPoint[]) => void;

  /**
   * Update a measurement's properties.
   *
   * @param measurement Partial measurement (`id` property is required).
   */
  updateMeasurement: (measurement: PartialMeasurement) => void;

  /**
   * Set a measurement as the "best" (lowest elapsed time).
   *
   * @param measurement Best measurement.
   */
  setBestMeasurement: (measurement: CloudMeasurement) => void;

  /**
   * Determine if all measurements are active, have been measured, and are done.
   */
  complete: boolean;

  /**
   * Get the measurement with the best elapsed time.
   */
  getBestMeasurement: () => CloudMeasurement;

  /**
   * Reset all measurement properties (`elapsed`, `done` & `best`) to initial values.
   */
  reset: NoOp;
}

const measurementAtom = atom<CloudMeasurement[]>({ key: "cloudMeasurements", default: [] });

const completeMeasurementsSelector = selector<boolean>({
  key: "cloud-measurements-complete",
  get: ({ get }) => {
    const measurements = get(measurementAtom);
    if (measurements.length === 0) {
      return false;
    }
    const completed = measurements.reduce<boolean[]>((final, each) => {
      if (each.active) {
        final.push(each.done);
      }
      return final;
    }, []);
    return all(...completed);
  },
});

/**
 * Manage measurement state of cloud location latency tests.
 */
export function useCloudMeasurements(): CloudMeasurements {
  const locations = useCloudLocations();
  const [measurements, setMeasurements] = useRecoilState(measurementAtom);
  const complete = useRecoilValue(completeMeasurementsSelector);
  const resetState = useResetRecoilState(measurementAtom);

  /**
   * Get a measurement by ID.
   * @param id Measurement ID
   */
  const getMeasurement = (id: string) => measurements.find(each => each.id === id) ?? null;

  const getMeasurementIndex = (id: string) => {
    const idx = measurements.findIndex(each => each.id === id);
    if (idx === -1) {
      return null;
    }
    return idx;
  };

  const addMeasurements = (locations: GeoPoint[]) => {
    const measurements: CloudMeasurement[] = locations.map(loc => {
      // Use the inactive status (65534) and consider the measurement complete.
      const elapsed = loc.active ? 65535 : 65534;
      return {
        ...loc,
        elapsed,
        done: false,
        best: false,
      };
    });
    setMeasurements(measurements);
  };

  const updateMeasurement = (measurement: PartialMeasurement) => {
    setMeasurements(prev => {
      return prev.reduce<CloudMeasurement[]>((final, each) => {
        if (each.id === measurement.id) {
          final.push({ ...each, ...measurement });
        } else {
          final.push(each);
        }
        return final;
      }, []);
    });
  };

  const getBestMeasurement = () =>
    measurements.reduce((prev, next) => (prev.elapsed > next.elapsed ? next : prev));

  const setBestMeasurement = (measurement: CloudMeasurement) => {
    const merged = merge({}, measurement, { best: true });
    updateMeasurement(merged);
  };

  const reset = () => addMeasurements(locations);

  useEffect(() => {
    if (measurements.length === 0) {
      addMeasurements(locations);
    }
  }, [resetState]);

  return {
    measurements,
    getMeasurement,
    getMeasurementIndex,
    addMeasurements,
    updateMeasurement,
    setBestMeasurement,
    complete,
    getBestMeasurement,
    reset,
  };
}

/**
 * Access only the `measurements` value of `useCloudMeasurements()`.
 */
export function useCloudMeasurementValues(): CloudMeasurement[] {
  return useRecoilValue(measurementAtom);
}
