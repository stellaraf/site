import { getContent } from '~/util';
import type { NextApiHandler } from 'next';
import type { IDocsArticle } from '~/types';

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET || !request.query.slug) {
    return response.status(401).json({ message: 'Invalid Token.' });
  }
  const articles = await getContent<IDocsArticle>('docsArticle', false, {
    'fields.slug': request.query.slug as string,
    include: 4,
  });

  if (articles.length === 0) {
    response.status(401).json({ message: 'Invalid Path.' });
  }

  let target = `/docs/${articles[0].slug}`;
  if (articles[0].docsGroup) {
    target = `/docs/${articles[0].docsGroup.slug}/${articles[0].slug}`;
  }

  response.setPreviewData({});
  response.redirect(target);
};

export default previewHandler;
