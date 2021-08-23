import { getProductDetails } from '~/lib/sfhub';
import { withCors } from '~/lib/middleware';

import type { NextApiHandler } from 'next';
import type { SFHubProduct } from '~/types';

type ProductsResponse = SFHubProduct[] | { error: string };

const getProducts: NextApiHandler<ProductsResponse> = async (request, response) => {
  const productCodes = ((): string =>
    Array.isArray(request.query.productCodes)
      ? request.query.productCodes.join(',')
      : request.query.productCodes)();

  const data = await getProductDetails(...productCodes.split(','));
  response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=270');
  return response.status(200).json(data);
};

export default withCors(getProducts, {
  origin: (origin, callback) => {
    if (
      typeof origin !== 'undefined' &&
      ['https://stellar.tech', 'https://stellar.af'].includes(origin)
    ) {
      return callback(null, true);
    } else {
      return callback(new Error(`Nah, '${origin}' origin`), false);
    }
  },
  preflightContinue: true,
  methods: 'GET,OPTIONS',
});
