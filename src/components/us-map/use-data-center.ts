import { useId } from "react";

import { useQuery } from "@tanstack/react-query";

import { fetchWithTimeout } from "~/lib";

import { useCloudMeasurements } from "./use-cloud-measurements";

import type { CloudMeasurement, FetcherArgs, UseDataCenterReturn } from "./types";
import type { PartialMeasurement } from "./use-cloud-measurements";

/**
 * Track the latency of an HTTP connection.
 */
async function fetcher(args: FetcherArgs): Promise<number> {
  const { id, url, controller, debug = false, timeout } = args;
  let duration = 65535;

  const log = (...args: unknown[]) => debug && console.log(...args);

  // Start monitoring.
  performance.mark(`start ${id}`);
  try {
    // Initiate the request.
    log(`Initiating request to ${url}`);
    const res = await fetchWithTimeout(
      url,
      {
        method: "POST",
        signal: controller.signal,
        body: JSON.stringify({ id }),
      },
      timeout,
      controller,
    );
    // Stop monitoring.
    performance.mark(`end ${id}`);

    // Measure the difference between the start & stop marks.
    performance.measure(id, `start ${id}`, `end ${id}`);

    // Extract & assign the duration in ms.
    const [measurement] = performance.getEntriesByName(id);

    // Reduce the measured latency by 20% to try and translate TCP latency to ICMP latency, which
    // users are more familiar with. This almost certainly needs adjusting.
    if (res.ok) {
      duration = measurement.duration / 5;
    } else {
      // If the response state is not "ok", it means the server responded with an error, but it
      // responded nonetheless. In this case, we consider it to be inactive.
      duration = 65534;
    }

    // Consider the endpoint unreachable if its response took longer than the timeout.
    if (duration > timeout) {
      duration = 65533;
    }
  } catch (err) {
    // Since this isn't a "real" HTTP request, we don't really care if it errors out, so long as
    // there was a response received to measure. If an error was thrown (i.e. why we're in this
    // catch block), we don't really care.
    if (duration !== 65535) {
      // In the catch block, if the duration is not 65535 (the initial value), this means a check
      // of the endpoint was tried, its duration was set, and an error occurred _afterwards_. This
      // indicates a functioning endpoint with some other error having occurred, so we'll measure
      // it anyway and display a console message just in case.
      performance.mark(`error ${id}`);
      performance.measure(id, `start ${id}`, `error ${id}`);
      const [measurement] = performance.getEntriesByName(id);

      duration = measurement.duration / 5;

      console.warn(err);
    } else {
      // In the catch block, if the duration is still 65535, this means a check of the endpoint
      // was tried, but didn't even go so far as to respond with an error or timeout. This
      // indicates either a problem in this code or some other strange issue. For display
      // purposes, we consider the endpoint unreachable and show an error message in the console.
      console.group(`Location ${id} at Test URL ${url} encountered an error`);
      console.log("Timeout:", timeout);
      console.log("Duration:", duration);
      console.trace(err);
      console.groupEnd();
      duration = 65533;
    }
  }
  log(`Completed measurement to ${url} -`, duration);
  return duration;
}

async function queryAll(
  measurements: CloudMeasurement[],
  updateMeasurement: (m: PartialMeasurement) => void,
): Promise<Nullable<CloudMeasurement[]>> {
  // Perform the query for each active location & set its new elapsed value.
  for (const measurement of measurements) {
    if (measurement.active) {
      // AbortController & signal are used to cancel async tasks; in this case, the fetch(). The
      // fetch is cancelled when each the cancel() method is called by react-query. There needs
      // to be a controller per location, so that each are individually cancellable. Otherwise,
      // if one query times out, they will all be cancelled.
      const controller = new AbortController();
      let debug = false;
      if (process.env.NODE_ENV === "development") debug = true;
      const elapsed = await fetcher({
        id: measurement.identifier,
        url: measurement.testUrl,
        controller,
        debug,
        timeout: measurement.timeout,
      });
      updateMeasurement({ identifier: measurement.identifier, elapsed, done: true });
    }
  }

  return measurements;
}

/**
 * Custom hook to query each data center location and measure its response time in milliseconds.
 *
 * Possible error states, indicated by extremely high latency times:
 *   65533: Error/Unreachable (displayed as "UNREACHABLE" in the UI)
 *   65534: Inactive (displayed as "INACTIVE" in the UI)
 *   65535: Not checked (no latency or error shown in the UI)
 */
export function useDataCenter(): UseDataCenterReturn {
  const { measurements, reset, updateMeasurement } = useCloudMeasurements();

  const queryId = useId();

  const queryKey = [queryId, ...measurements.map(m => m.identifier)];

  const queryFn = async () => await queryAll(measurements, updateMeasurement);

  const { refetch, ...otherQuery } = useQuery(queryKey, {
    queryFn,
    enabled: false, // Don't automatically query.
    retry: false, // Don't automatically retry on failures.
    cacheTime: 30000, // Cache the data for 30 seconds.
  });

  /**
   * When executing a new query (which is done by manually pressing a button, NOT automatically),
   * reset the 'best' properties to false, clear the cached response, and then refetch.
   */
  const execute = () => {
    reset();
    refetch();
  };

  return { execute, ...otherQuery };
}
