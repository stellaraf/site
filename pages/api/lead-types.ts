import type { NextApiRequest, NextApiResponse } from "next";

import { getLeadTypes } from "~/lib/server";

export default async function handler(_: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const types = await getLeadTypes();
    return res.json(types);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: String(error) });
  }
}
