import type { NextApiHandler } from "next";

import { getPageId } from "~/util";

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET || !request.query.slug) {
    return response.status(401).json({ message: "Invalid Token." });
  }
  const pageId = await getPageId(request.query.slug as string, false);

  if (!pageId) {
    response.status(401).json({ message: "Invalid Path." });
    return;
  }

  response.setPreviewData({});
  response.redirect(`/${request.query.slug}`);
};

export default previewHandler;
