import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

import { getStandardValues } from "~/lib/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.url === "undefined") {
    return res.status(500).send(null);
  }
  const { query } = queryString.parseUrl(req.url);
  if (typeof query.name === "string" && query.name !== "") {
    try {
      const types = await getStandardValues(query.name);
      return res.json(types);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: String(error) });
    }
  }
  return res.status(400).json({ error: "missing or invalid 'name' in query" });
}
