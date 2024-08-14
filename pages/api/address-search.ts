import type { NextApiRequest, NextApiResponse } from "next";
import { search } from "~/lib/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  let q = req.query.search;
  if (q === "" || q === null || typeof q === "undefined") {
    return res.json([]);
  }
  if (Array.isArray(q)) {
    q = q[0];
  }
  let locationType = "address";
  if (typeof req.query.locationType === "string" && req.query.locationType !== "") {
    locationType = req.query.locationType;
  }
  try {
    const results = await search("857DE7DA-0FFC-4136-91F4-ECD681C5F645", q, locationType);
    return res.json(results);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.json({ error: error.message });
    }
    return res.json({ error: String(error) });
  }
}
