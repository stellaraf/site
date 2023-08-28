import queryString from "query-string";

import { getStatus } from "~/lib/api";

import type { NextApiRequest } from "next";

const headers = new Headers({
  "Cache-Control": "s-maxage=3600",
  "content-type": "application/json",
});

export default async function handler(request: NextApiRequest): Promise<Response> {
  if (typeof request.url === "undefined") {
    return new Response(null, { status: 500 });
  }
  const { query } = queryString.parseUrl(request.url);
  let tz: string = "";
  if (!("tz" in query) || query.tz === "" || query.tz === null) {
    return new Response(JSON.stringify({ error: "timezone required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (Array.isArray(query.tz)) {
    tz = tz[0];
  } else {
    tz = query.tz;
  }

  try {
    const status = await getStatus(tz);
    return new Response(JSON.stringify({ status }), { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export const config = {
  runtime: "edge",
};
