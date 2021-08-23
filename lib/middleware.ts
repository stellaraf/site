import { use } from 'next-api-middleware';
import cors from 'cors';

import type { NextApiHandler } from 'next';
import type { NextMiddleware, ExpressMiddleware } from 'next-api-middleware';
import type { CorsOptions } from 'cors';

/**
 * Middleware to catch any errors and respond with a JSON representation.
 */
export const errorBoundary: NextMiddleware = async (_, res, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: String(err) });
    }
  }
};

/**
 * Enable CORS on an API handler.
 */
export function withCors<H extends NextApiHandler = NextApiHandler>(
  handler: H,
  options?: CorsOptions,
): H {
  return use(errorBoundary, cors(options) as ExpressMiddleware)(handler) as H;
}
