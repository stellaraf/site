import { ContentSection, Hero, Callout, Testimonials } from "~/components";
import { pageQuery, commonStaticPropsQuery, pageStaticPathsExactQuery } from "~/queries";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const DynamicPage: NextPage<PageProps> = props => {
  const { title, subtitle, body, contents, callout } = props;

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} />
      {contents.map((sect, i) => {
        return <ContentSection content={sect} key={sect.title} index={i} />;
      })}
      {callout && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const slug = ctx.params?.page ?? "notfound";
  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug });
  const common = await commonStaticPropsQuery();
  return { props: { ...page, preview, common } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsExactQuery();
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: false };
};

export default DynamicPage;
