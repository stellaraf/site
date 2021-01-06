import { getContent } from '~/util';
import { SEO } from '~/components';
import { PartnerLayout } from '~/layouts';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IPartnerPage } from '~/types';

type UrlQuery = {
  partner: string;
};

const PartnerPage: React.FC<IPartnerPage> = (props: IPartnerPage) => {
  const { pageData } = props;
  const { title, subtitle } = pageData;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <PartnerLayout {...pageData} />
    </>
  );
};

export const getStaticProps: GetStaticProps<IPartnerPage, UrlQuery> = async ctx => {
  const partner = ctx.params?.partner;
  const preview = ctx?.preview ?? false;
  let pageData = {} as IPartnerPage['pageData'];
  try {
    const matches = await getContent<IPartnerPage['pageData']>('partnerPage', preview, {
      'fields.name[match]': partner,
      include: 4,
    });
    pageData = matches[0] ?? {};
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { partner: 'vmware' } }, { params: { partner: 'veeam' } }],
  fallback: false,
});

export default PartnerPage;
