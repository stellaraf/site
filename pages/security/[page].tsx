import { ContentSection, Hero, SEO, Callout, Testimonials } from "~/components";
import { FallbackLayout } from "~/layouts";
import { pageQuery } from "~/queries";

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

  return { props: { ...page, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { page: "demo" } }],
  fallback: false,
});

export default SecurityPage;
