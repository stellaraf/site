import create from 'zustand';
import { useCloudLocations } from '~/context';
import { all } from '~/util';

import type { GetState, SetState } from 'zustand';
import type { GeoPoint, CloudMeasurement } from '~/types';

type PartialMeasurement = Pick<CloudMeasurement, 'id'> & Partial<CloudMeasurement>;

type CloudMeasurements = {
  measurements: CloudMeasurement[];
  getMeasurement: (id: string) => Nullable<CloudMeasurement>;
  getMeasurementIndex: (id: string) => Nullable<number>;
  addMeasurements: (locations: GeoPoint[]) => void;
  updateMeasurement: (measurement: PartialMeasurement) => void;
  getBestMeasurement: () => CloudMeasurement;
  setBestMeasurement: (measurement: CloudMeasurement) => void;
  isComplete: () => boolean;
  reset: NoOp;
};

const useStore = create<CloudMeasurements>(
  (set: SetState<CloudMeasurements>, get: GetState<CloudMeasurements>) => ({
    measurements: [],

    /**
     * Get a measurement by ID.
     * @param id Measurement ID
     */
    getMeasurement(id: string): Nullable<CloudMeasurement> {
      const { measurements } = get();
      return measurements.find(each => each.id === id) ?? null;
    },

    /**
     * Get a measurement's array index by its ID property.
     *
     * @param id Measurement ID
     */
    getMeasurementIndex(id: string): Nullable<number> {
      const { measurements } = get();
      const idx = measurements.findIndex(each => each.id === id);
      if (idx === -1) {
        return null;
      }
      return idx;
    },

    /**
     * Populate cloud locations & initial measurement data.
     *
     * @param locations GeoPoints/Cloud locations from CMS.
     */
    addMeasurements(locations: GeoPoint[]): void {
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
      set({ measurements });
    },

    /**
     * Update a measurement's properties.
     *
     * @param measurement Partial measurement (`id` property is required).
     */
    updateMeasurement(measurement: Pick<CloudMeasurement, 'id'> & Partial<CloudMeasurement>): void {
      set(state => ({
        measurements: state.measurements.map(current => {
          if (current.id === measurement.id) {
            return { ...current, ...measurement };
          }
          return current;
        }),
      }));
    },

    /**
     * Get the measurement with the best elapsed time.
     */
    getBestMeasurement(): CloudMeasurement {
      const { measurements } = get();
      return measurements.reduce((prev, next) => (prev.elapsed > next.elapsed ? next : prev));
    },

    /**
     * Set a measurement as the "best" (lowest elapsed time).
     *
     * @param measurement Best measurement.
     */
    setBestMeasurement(measurement: CloudMeasurement): void {
      const { updateMeasurement } = get();
      updateMeasurement({ ...measurement, best: true });
    },

    /**
     * Determine if all measurements are active, have been measured, and are done.
     */
    isComplete(): boolean {
      const { measurements } = get();
      return all(...measurements.filter(m => m.active).map(m => m.done));
    },

    /**
     * Reset all measurement properties (`elapsed`, `done` & `best`) to initial values.
     */
    reset(): void {
      const { measurements, addMeasurements } = get();
      addMeasurements(measurements);
      //   for (const measurement of measurements) {
      //     updateMeasurement({ ...measurement, elapsed: 65535, done: false, best: false });
      //   }
    },
  }),
);

/**
 * Access only the `measurements` value of `useCloudMeasurements()`.
 */
export function useCloudMeasurementValues(): CloudMeasurement[] {
  const measurements = useStore(state => state.measurements);
  return measurements;
}

/**
 * Manage measurement state of cloud location latency tests.
 */
export function useCloudMeasurements(): CloudMeasurements {
  const locations = useCloudLocations();
  const state = useStore();
  if (state.measurements.length === 0) {
    state.addMeasurements(locations);
  }

  return state;
}
