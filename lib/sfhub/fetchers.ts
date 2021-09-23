import { SFHub } from './client';

import type { QueryFunctionContext } from 'react-query';
import type { SFHubProduct } from '~/types';

type ProductsResponse = SFHubProduct[] | { error: string };

const sfhub = new SFHub();

/**
 * Fetch details for products by SKU/Product Code.
 *
 * @param products Product codes/SKUs
 */
export async function getProductDetails(...products: string[]): Promise<ProductsResponse> {
  try {
    const data = await sfhub.getProductDetails(...products);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: String(error) };
  }
}

/**
 * Fetch details for products by SKU/Product Code, but for react-query.
 *
 * @param products Product codes/SKUs
 */
export async function queryProducts(ctx: QueryFunctionContext<string[]>): Promise<SFHubProduct[]> {
  const { queryKey } = ctx;
  return await sfhub.getProductDetails(...queryKey);
}
