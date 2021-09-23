import { useCallback } from 'react';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import isDataEqual from 'react-fast-compare';

import type { QueryFunctionContext, UseQueryResult } from 'react-query';
import type { SFHubProduct } from '~/types';

type UseProductPrice = {
  getProductPrice(code: string): Nullable<SFHubProduct>;
} & UseQueryResult<SFHubProduct[], Error>;

export async function fetchProductPrice(
  ctx: QueryFunctionContext<string[]>,
): Promise<SFHubProduct[]> {
  const { queryKey } = ctx;
  const productCodes = queryKey.join(',');

  let baseUrl = '';
  let origin = '';
  if (typeof process.env.VERCEL_URL !== 'undefined') {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }
  if (typeof window !== 'undefined') {
    origin = window.origin;
  }

  const url = `${baseUrl}/api/sfhub/products`;
  const queryUrl = queryString.stringifyUrl({
    url,
    query: { productCodes },
  });

  try {
    const res = await fetch(queryUrl, { method: 'GET', headers: { origin } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`${error}`);
  }
}

export function useProductPrice(productCodes: string[]): UseProductPrice {
  const query = useQuery<SFHubProduct[], Error, SFHubProduct[], string[]>({
    queryKey: productCodes,
    queryFn: fetchProductPrice,
    refetchOnWindowFocus: false,
    staleTime: 24 * 3.6e6, // 24 hours
    cacheTime: 24 * 3.6e6, // 24 hours
    isDataEqual,
  });
  const getProductPrice = useCallback(
    (code: string): Nullable<SFHubProduct> => {
      if (query.data) {
        const matching = query.data.find(p => p.productCode === code);
        if (matching) {
          return matching;
        }
      }
      return null;
    },
    [query],
  );
  return { getProductPrice, ...query };
}