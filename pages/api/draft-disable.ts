import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  res.setDraftMode({ enable: false }).status(307).end();
}
