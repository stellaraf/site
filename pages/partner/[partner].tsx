import NextError from 'next/error';
import { useRouter } from 'next/router';
import { chakra } from '@chakra-ui/react';
import { SEO, ContentLoader } from '~/components';
import { PartnerLayout } from '~/layouts';
import { getPartnerPage } from '~/util';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { IPartnerPage } from '~/types';

type UrlQuery = {
  partner: string;
};

const Layout = chakra('div', {
  baseStyle: {
    w: '100%',
    d: 'flex',
    flexDir: 'column',
    alignItems: 'center',
    minH: '40vh',
    pt: 32,
  },
});

const PartnerPage: React.FC<IPartnerPage> = (props: IPartnerPage) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return (
      <>
        <SEO title="Loading..." />
        <Layout>
          <ContentLoader css={{ '& div.__st-content-body': { maxWidth: 'unset' } }} />
        </Layout>
      </>
    );
  }

  const { pageData } = props;

  if (typeof pageData === 'undefined' || Object.keys(pageData).length === 0) {
    return <NextError statusCode={400} />;
  }

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
  if (typeof partner === 'undefined') {
    throw new Error('No partner specified.');
  }

  const pageData = await getPartnerPage(partner, preview);

  return { props: { pageData } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { partner: 'vmware' } }, { params: { partner: 'veeam' } }],
  fallback: true,
});

export default PartnerPage;
