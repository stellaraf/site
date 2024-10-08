import { useRouter } from "next/router";

import { Callout, ContentLoader, ContentSection, Hero, SEO, Testimonials } from "~/components";
import { FallbackLayout } from "~/layouts";
import { is } from "~/lib";
import { commonStaticPropsQuery, pageQuery, pageStaticPathsQuery } from "~/queries";
import { type PageProps, Stage } from "~/types";

import ErrorPage from "../_error";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

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

  if (path === "notfound") {
    return { notFound: true };
  }

  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;

  try {
    const page = await pageQuery({ slug: `cloud/${path}`, stage });
    const common = await commonStaticPropsQuery({ stage });
    return { props: { ...page, draft, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "cloud" });
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: "blocking" };
};

export default CloudPage;
