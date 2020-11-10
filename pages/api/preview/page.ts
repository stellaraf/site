import { getPage } from 'site/util';
import type { NextApiHandler } from 'next';

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET || !request.query.slug) {
    return response.status(401).json({ message: 'Invalid Token.' });
  }
  const pageData = await getPage(request.query.slug as string, false);

  if (!pageData) {
    response.status(401).json({ message: 'Invalid Path.' });
  }

  response.setPreviewData({});
  response.redirect(`/${pageData.slug}`);
};

export default previewHandler;
