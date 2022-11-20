import { is } from "~/lib";

import type { NextApiRequest } from "next";

type ValidJsonRequest = Omit<NextApiRequest, "body"> & { body: Record<string, unknown> };

export function isValidJsonRequest(request: NextApiRequest): request is ValidJsonRequest {
  if (!request.headers["content-type"]?.includes("application/json")) {
    return false;
  }
  return is(request.body) && typeof request.body === "object";
}

export function originFromEnv(env: NodeJS.ProcessEnv): URL {
  let vercel_env = env.VERCEL_ENV ?? "development";
  vercel_env = vercel_env.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  if (!["production", "development"].includes(vercel_env)) {
    return new URL(`https://${vercel_env}.stellar.tech`);
  }
  return new URL("https://stellar.tech");
}
