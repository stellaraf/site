import { ContentSection, Hero, SEO, Callout, Testimonials } from "~/components";
import { FallbackLayout } from "~/layouts";
import { pageQuery, commonStaticPropsQuery, pageStaticPathsQuery } from "~/queries";

import ErrorPage from "../_error";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const SecurityPage: NextPage<PageProps> = props => {
  if (props.error) {
    return (
      <FallbackLayout>
        <ErrorPage error={props.error} />
      </FallbackLayout>
    );
  }

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
  if (slug === "notfound") {
    return { notFound: true };
  }

  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug: `security/${slug}` });
  const common = await commonStaticPropsQuery();

  return { props: { ...page, preview, common } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "security" });
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: false };
};

export default SecurityPage;
