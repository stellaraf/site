import { useQuery, queryCache } from 'react-query';
import { Initial } from '@hookstate/initial';
import { Touched } from '@hookstate/touched';
import { all } from 'site/util';
import { useCloudLocations } from 'site/state';

import type { Locations } from './types';

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

interface TFetcher {
  id: string;
  url: string;
  signal: AbortSignal;
  debug?: boolean;
}

/**
 * Track the latency of an HTTP connection.
 */
async function fetcher(args: TFetcher): Promise<number> {
  const { id, url, signal, debug = false } = args;
  let duration = 65535;
  const log = (...args: any) => debug && console.log(...args);
  // Start monitoring.
  performance.mark(`start ${id}`);
  try {
    // Initiate the request.
    log(`Initiating request to ${url}`);
    await fetch(url, { body: JSON.stringify({ id }), method: 'POST', signal });

    // Stop monitoring.
    performance.mark(`end ${id}`);

    // Measure the difference between the start & stop marks.
    performance.measure(id, `start ${id}`, `end ${id}`);

    // Extract & assign the duration in ms.
    const [measurement] = performance.getEntriesByName(id);

    /**
     * Reduce the measured latency by 20% to try and translate TCP latency to ICMP latency, which
     * users are more familiar with. This almost certainly needs adjusting.
     */
    duration = measurement.duration / 5;
  } catch (err) {
    /**
     * Since this isn't a "real" HTTP request, we don't really care if it errors out, so long
     * as there was a response received to measure.
     *
     * However, we don't want to measure or care about AbortErrors, which are raised by the
     * AbortController/signal when we intentionally cancel the request.
     */
    if (err.name !== 'AbortError') {
      performance.mark(`error ${id}`);
      performance.measure(id, `start ${id}`, `error ${id}`);
      const [measurement] = performance.getEntriesByName(id);
      console.error(err);
      duration = measurement.duration / 5;
    }
  }
  log(`Completed measurement to ${url} -`, duration);
  // return duration;
  return duration * (Math.random() * 10);
}

export function useDataCenter(locations: Locations) {
  const tests = useCloudLocations();
  tests.attach(Initial);
  tests.attach(Touched);

  async function queryAll(this: CancellablePromise<boolean>) {
    /**
     * AbortController & signal are used to cancel async tasks; in this case, the fetch(). The fetch
     * is cancelled when each the cancel() method is called by react-query.
     */
    const controller = new AbortController();
    const { signal } = controller;

    /**
     * Add a cancel method to this function, see:
     * https://react-query.tanstack.com/docs/guides/query-cancellation
     */
    this.cancel = () => controller.abort();

    let best = null;

    /**
     * Perform the query for each location & merge its new elapsed value with the current state.
     */
    for (const [idx, loc] of tests.entries()) {
      const elapsed = await fetcher({
        id: loc.id.value,
        url: loc.testUrl.value,
        signal,
      });
      tests[idx].merge({ elapsed });
    }

    /**
     * Use the @hookstate/untouched plugin to determine if the location objects have been touched.
     * An untouched state would indicate that the location is still set to the default 65535 value
     * and still needs to be fetched.
     */
    const isDone = all(...locations.map((_, idx) => Touched(tests[idx].elapsed).touched()));

    /**
     * Only if all locations have been checked, determine which of the locations has the lowest
     * RTT.
     */
    if (isDone) {
      const thisBest = tests.reduce((prev, next) =>
        prev.elapsed.value > next.elapsed.value ? next : prev,
      );

      /**
       * Only if the elapsed value is not still the default 65535 and if the location is not
       * already the best, fully export the best location's object as the return value of this
       * hook.
       */
      if (thisBest.elapsed.value !== 65535 && !thisBest.best.value) {
        const bestIdx = tests.map(loc => loc.id.value).indexOf(thisBest.id.value);
        tests[bestIdx].merge({ best: true });
        best = JSON.parse(JSON.stringify(thisBest.value));
      }
    }
    return best;
  }
  const queryKey = locations.map(l => l.id).join('_');
  const { refetch, ...otherQuery } = useQuery(queryKey, queryAll, {
    enabled: false, // Don't automatically query.
    retry: false, // Don't automatically retry on failures.
    cacheTime: 900_000, // Cache the data for 15 minutes.
  });

  /**
   * When executing a new query (which is done by manually pressing a button, NOT automatically),
   * reset the 'best' properties to false, clear the cached response, and then refetch.
   */
  const execute = () => {
    tests.map(test => test.best.set(false));
    queryCache.invalidateQueries(queryKey);
    refetch();
  };
  return { execute, ...otherQuery };
}
