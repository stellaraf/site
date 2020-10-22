import { getContent } from 'site/util';
import { SEO } from 'site/components';
import { VendorLayout } from 'site/layouts';

import type { GetStaticProps, GetStaticPaths, IVendorPage } from 'site/types';
import type { GetStaticPropsContext } from 'next';

type UrlQuery = {
  vendor: string;
};

export default function VendorPage(props: IVendorPage) {
  const { pageData } = props;
  const { title, subtitle } = pageData;

  return (
    <>
      <SEO title={title} description={subtitle} />
      <VendorLayout {...pageData} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IVendorPage, UrlQuery> = async (
  ctx: GetStaticPropsContext<UrlQuery>,
) => {
  const vendor = ctx.params?.vendor;
  let pageData = Object();
  try {
    const matches = await getContent('vendorPage', { 'fields.name[match]': vendor, include: 4 });
    pageData = matches[0] ?? {};
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { vendor: 'vmware' } }, { params: { vendor: 'veeam' } }],
  fallback: false,
});
