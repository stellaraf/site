import { SFHub } from '~/util';

import type { NextApiHandler } from 'next';
import type { SFHubProduct } from '~/types';

type ProductsResponse = SFHubProduct[] | { error: string };

const sfhub = new SFHub();

const getProducts: NextApiHandler<ProductsResponse> = async (request, response) => {
  const productCodes = ((): string =>
    Array.isArray(request.query.productCodes)
      ? request.query.productCodes.join(',')
      : request.query.productCodes)();

  try {
    const data = await sfhub.getProductDetails(...productCodes.split(','));
    response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=270');
    return response.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ error: error.message });
    }
    return response.status(500).json({ error: String(error) });
  }
};

export default getProducts;
