import { getContent } from '~/util';

import type { NextApiHandler } from 'next';
import type { IPartnerPage } from '~/types';

const previewHandler: NextApiHandler = async (request, response) => {
  if (request.query.secret !== process.env.PREVIEW_SECRET) {
    return response.status(401).json({ message: 'Invalid Token.' });
  }
  const partner = request.query.partner as string;
  if (!request.query.partner) {
    return response.status(404).json({ message: `Partner '${partner}' does not exist.` });
  }
  const matches = await getContent<IPartnerPage>('partnerPage', false, {
    'fields.name[match]': partner.toLowerCase(),
    include: 4,
  });

  if (matches.length === 0) {
    response.status(500).json({
      message: `Partner '${partner}' is valid, but an error occurred while fetching its configuration.`,
    });
  }

  response.setPreviewData({});
  response.redirect(`/partner/${matches[0].pageData.name.toLowerCase()}`);
};

export default previewHandler;
