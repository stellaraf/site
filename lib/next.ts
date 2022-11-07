import { is } from "~/lib";

import type { NextApiRequest } from "next";

type ValidJsonRequest = Omit<NextApiRequest, "body"> & { body: Record<string, unknown> };

export function isValidJsonRequest(request: NextApiRequest): request is ValidJsonRequest {
  if (!request.headers["content-type"]?.includes("application/json")) {
    return false;
  }
  return is(request.body) && typeof request.body === "object";
}
