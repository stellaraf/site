import { useState } from '@hookstate/core';

interface IUseConnectionText {
  /**
   * Location/GeoPoint ID.
   */
  id: string;
  /**
   * HTTP URL to test.
   */
  url: string;
  /**
   * AbortController.signal method to cancel the request.
   */
  signal: AbortSignal;
}

/**
 * Track the latency of an HTTP connection.
 */
export function useConnectionTest(options: IUseConnectionText) {
  const { id, url, signal } = options;

  const fetcher = async () => {
    let duration = 65535;
    // Start monitoring.
    performance.mark(`start ${id}`);
    try {
      // Initiate the request.
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
    return duration;
  };

  return useState(fetcher);
}
