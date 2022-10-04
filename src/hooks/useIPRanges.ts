import { useQuery } from '@tanstack/react-query';
import { getJson } from '~/util';

import type { UseQueryResult, QueryFunction } from '@tanstack/react-query';

export type IPRanges = {
  ipv4: string[];
  ipv6: string[];
  urls: string[];
};

const queryFn: QueryFunction<IPRanges, string[]> = async ctx => {
  const { queryKey } = ctx;
  const [url] = queryKey;
  return await getJson<IPRanges>(url);
};

/**
 * Query hook for Stellar IP Ranges in JSON format.
 *
 * @returns react-query instance
 */
export function useIPRanges(): UseQueryResult<IPRanges> {
  return useQuery<IPRanges, unknown, IPRanges, string[]>({
    queryFn,
    queryKey: ['https://ip.stellar.tech/json'],
  });
}
