import type { NextApiHandler } from "next";

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET || !request.query.slug) {
    return response.status(401).json({ message: "Invalid Token." });
  }

  response.setPreviewData({});
  response.redirect("/");
};

export default previewHandler;
