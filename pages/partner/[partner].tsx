import { getContent } from 'site/util';
import { SEO } from 'site/components';
import { PartnerLayout } from 'site/layouts';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IPartnerPage } from 'site/types';

type UrlQuery = {
  partner: string;
};

export default function PartnerPage(props: IPartnerPage) {
  const { pageData } = props;
  const { title, subtitle } = pageData;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <PartnerLayout {...pageData} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IPartnerPage, UrlQuery> = async ctx => {
  const partner = ctx.params?.partner;
  const preview = ctx?.preview ?? false;
  let pageData = Object();
  try {
    const matches = await getContent('partnerPage', preview, {
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
