import type { NextApiHandler } from "next";

import { getEntry } from "~/util";

import type { PageAttrs } from "~/types";

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET || !request.query.pageId) {
    return response.status(401).json({ message: "Invalid Token." });
  }
  const pageId = request.query.pageId as string;
  const pageData = await getEntry<PageAttrs>(pageId);

  if (!pageData) {
    response.status(401).json({ message: "Invalid Path." });
  }

  response.setPreviewData({});
  response.redirect(`/${pageData.fields.slug}`);
};

export default previewHandler;
