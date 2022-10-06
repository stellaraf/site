import type { NextApiHandler } from "next";

import { getPartnerPage } from "~/util";

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET) {
    return response.status(401).json({ message: "Invalid Token." });
  }

  const partner = request.query.partner as string;

  const pageData = await getPartnerPage(partner.toLowerCase(), false);

  if (!pageData) {
    return response.status(404).json({ message: `Partner '${partner}' does not exist.` });
  }

  response.setPreviewData({});
  response.redirect(`/partner/${pageData.name.toLowerCase()}`);
};

export default previewHandler;
