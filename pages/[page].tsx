import { ContentSection, Hero, SEO, Callout, Testimonials } from "~/components";
import { pageQuery } from "~/queries";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const DynamicPage: NextPage<PageProps> = props => {
  const { title, subtitle, body, contents, callout } = props;

  return (
    <>
      <SEO title={title} description={subtitle ?? undefined} />
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
  return { props: { ...page, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { page: "consulting" } }, { params: { page: "services" } }],
  fallback: false,
});

export default DynamicPage;
