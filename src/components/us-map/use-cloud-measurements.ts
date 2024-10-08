import { useEffect } from "react";

import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

import { useCloudLocations } from "~/context";
import { all } from "~/lib";

import type { CloudLocation } from "~/queries";
import type { CloudMeasurement } from "./types";

export type PartialMeasurement = Pick<CloudMeasurement, "identifier"> & Partial<CloudMeasurement>;

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
  addMeasurements: (locations: CloudLocation[]) => void;

  /**
   * Update a measurement's properties.
   *
   * @param measurement Partial measurement (`id` property is required).
   */
  updateMeasurement: (measurement: PartialMeasurement) => void;

  /**
   * Reset all measurement properties (`elapsed`, `done` & `best`) to initial values.
   */
  reset: () => void;
}

const measurementAtom = atomWithReset<CloudMeasurement[]>([]);

const completeMeasurementsSelector = atom<boolean>(get => {
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
  const complete = all(...completed);
  return complete;
});

const bestMeasurementSelector = atom<Nullable<CloudMeasurement>>(get => {
  const measurements = get(measurementAtom);
  const complete = get(completeMeasurementsSelector);
  if (measurements.length === 0) {
    return null;
  }
  if (!complete) {
    return null;
  }
  const best = measurements.reduce((prev, next) => (prev.elapsed > next.elapsed ? next : prev));
  return best;
});

/**
 * Access only the `measurements` value of `useCloudMeasurements()`.
 */
export const useCloudMeasurementValues = (): CloudMeasurement[] => useAtomValue(measurementAtom);

/**
 * Best Cloud Measurement if all measurements are complete, `null` if not.
 */
export const useBestMeasurement = () => useAtomValue(bestMeasurementSelector);

/**
 * Manage measurement state of cloud location latency tests.
 */
export function useCloudMeasurements(): CloudMeasurements {
  const locations = useCloudLocations();
  const [measurements, setMeasurements] = useAtom(measurementAtom);
  const resetState = useResetAtom(measurementAtom);

  /**
   * Get a measurement by ID.
   * @param id Measurement ID
   */
  const getMeasurement = (id: string) => measurements.find(each => each.identifier === id) ?? null;

  const getMeasurementIndex = (id: string) => {
    const idx = measurements.findIndex(each => each.identifier === id);
    if (idx === -1) {
      return null;
    }
    return idx;
  };

  const addMeasurements = (locations: CloudLocation[]) => {
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
        if (each.identifier === measurement.identifier) {
          final.push({ ...each, ...measurement });
        } else {
          final.push(each);
        }
        return final;
      }, []);
    });
  };

  const reset = () => {
    resetState();
    addMeasurements(locations);
  };

  useEffect(() => {
    if (measurements.length === 0) {
      addMeasurements(locations);
    }
    return reset;
  }, [resetState]);

  return {
    measurements,
    getMeasurement,
    getMeasurementIndex,
    addMeasurements,
    updateMeasurement,
    reset,
  };
}
