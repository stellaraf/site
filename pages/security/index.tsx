import { ContentSection, Hero, SEO, Callout, Testimonials } from "~/components";
import { pageQuery, commonStaticPropsQuery } from "~/queries";

import type { GetStaticProps, NextPage } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const SecurityIndex: NextPage<PageProps> = props => {
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
  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug: "security" });
  const common = await commonStaticPropsQuery();
  return { props: { ...page, preview, common } };
};

export default SecurityIndex;
