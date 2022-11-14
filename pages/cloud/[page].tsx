import { useRouter } from "next/router";

import { Callout, ContentLoader, ContentSection, Hero, SEO, Testimonials } from "~/components";
import { FallbackLayout } from "~/layouts";
import { is } from "~/lib";
import { pageQuery, commonStaticPropsQuery, pageStaticPathsQuery } from "~/queries";

import ErrorPage from "../_error";

import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PageProps } from "~/types";

type UrlQuery = {
  page: string;
};

const CloudPage: NextPage<PageProps> = props => {
  if (props.error) {
    return (
      <FallbackLayout>
        <ErrorPage error={props.error} />
      </FallbackLayout>
    );
  }

  const { isFallback } = useRouter();
  const { title, subtitle, body, callout, contents } = props;

  if (isFallback) {
    return (
      <>
        <SEO title="Loading..." />
        <FallbackLayout>
          <ContentLoader css={{ "& div.__st-content-body": { maxWidth: "unset" } }} />
        </FallbackLayout>
      </>
    );
  }

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} />
      {contents.map((sect, i) => {
        return <ContentSection content={sect} key={sect.title} index={i} />;
      })}
      {is(callout) && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const path = ctx.params?.page ?? "notfound";
  const preview = ctx?.preview ?? false;

  if (path === "notfound") {
    return { notFound: true };
  }

  try {
    const page = await pageQuery({ slug: `cloud/${path}` });
    const common = await commonStaticPropsQuery();
    return { props: { ...page, preview, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "cloud" });
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: false };
};

export default CloudPage;
