import { Callout, ContentSection, Hero, Testimonials } from "~/components";
import { FallbackLayout } from "~/layouts";
import { commonStaticPropsQuery, pageQuery, pageStaticPathsQuery } from "~/queries";
import { type PageProps, Stage } from "~/types";

import ErrorPage from "../_error";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

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

  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  const page = await pageQuery({ slug: `security/${slug}`, stage });
  const common = await commonStaticPropsQuery({ stage });

  return { props: { ...page, draft, common } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "security" });
  const paths = pages.map(page => ({ params: { page } }));
  return { paths, fallback: "blocking" };
};

export default SecurityPage;
