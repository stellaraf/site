import { merge } from 'merge-anything';

export async function post(url: string, data: object, config: object = {}) {
  const defaultConfig = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    crossDomain: true,
  };
  const merged = merge(defaultConfig, config, { body: JSON.stringify(data) });
  return await fetch(url, merged);
}
