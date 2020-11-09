import { merge } from 'merge-anything';

export async function post(url: string, data: object, config: RequestInit = {}) {
  const defaultConfig = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    crossDomain: true,
  } as RequestInit;

  const merged = merge(defaultConfig, config, { body: JSON.stringify(data) }) as RequestInit;
  return await fetch(url, merged);
}

/**
 * Fetch Wrapper that incorporates a timeout via a passed AbortController instance.
 *
 * Adapted from: https://lowmess.com/blog/fetch-with-timeout
 */
export async function fetchWithTimeout(
  uri: string,
  options: RequestInit = {},
  time: number = 7500,
  controller: AbortController,
) {
  /**
   * Lets set up our `AbortController`, and create a request options object that includes the
   * controller's `signal` to pass to `fetch`.
   */
  const { signal = new AbortController().signal, ...allOptions } = options;
  const config = { ...allOptions, signal };
  /**
   * Set a timeout limit for the request using `setTimeout`. If the body of this timeout is
   * reached before the request is completed, it will be cancelled.
   */
  setTimeout(() => {
    controller.abort();
  }, time);
  return await fetch(uri, config);
}

export async function getJson<R = {}>(url: string, config: RequestInit = {}): Promise<R> {
  const defaultConfig = {
    method: 'GET',
    crossDomain: true,
  };
  const merged = merge(defaultConfig, config) as RequestInit;
  const res = await fetch(url, merged);
  return await res.json();
}
