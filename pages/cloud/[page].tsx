import { useRouter } from "next/router";

import { Callout, ContentLoader, ContentSection, Hero, SEO, Testimonials } from "~/components";
import { FallbackLayout } from "~/layouts";
import { is } from "~/lib";
import { pageQuery } from "~/queries";

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
      <SEO title={title} description={subtitle ?? undefined} />
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
    return { props: { ...page, preview } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }

  const page = await pageQuery({ slug: `cloud/${path}` });
  return { props: { ...page, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { page: "daas" } }],
  fallback: true,
});

export default CloudPage;
