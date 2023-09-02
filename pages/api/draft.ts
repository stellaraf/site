import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.query.token !== process.env.HYGRAPH_DRAFT_TOKEN) {
    return res.status(401).json({ error: "invalid token" });
  }
  if (!req.query.slug || typeof req.query.slug !== "string") {
    return res.status(400).json({ error: "missing slug" });
  }
  res.setDraftMode({ enable: true });
  res.redirect(req.query.slug);
}
