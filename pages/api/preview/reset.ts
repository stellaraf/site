import type { NextApiHandler } from 'next';

const previewHandler: NextApiHandler = async (_, response) => {
  response.clearPreviewData();
  response.redirect('/');
};

export default previewHandler;
