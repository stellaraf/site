import NextError from "next/error";
import { useRouter } from "next/router";

import { ContentLoader, SEO } from "~/components";
import { FallbackLayout, PartnerLayout } from "~/layouts";
import { commonStaticPropsQuery, pageQuery, pageStaticPathsQuery } from "~/queries";
import { type PageProps, Stage } from "~/types";

import ErrorPage from "../_error";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

type UrlQuery = {
  partner: string;
};

const PartnerPage: NextPage<PageProps> = props => {
  if (props.error) {
    return (
      <FallbackLayout>
        <ErrorPage error={props.error} />
      </FallbackLayout>
    );
  }
  const { isFallback } = useRouter();
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

  if (typeof props.title === "undefined") {
    return <NextError statusCode={400} />;
  }

  return <PartnerLayout {...props} />;
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const partner = ctx.params?.partner;
  const preview = ctx?.preview ?? false;

  if (typeof partner === "undefined") {
    return { notFound: true };
  }
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  try {
    const page = await pageQuery({ slug: `partner/${partner}`, stage });
    const common = await commonStaticPropsQuery({ stage });
    return { props: { ...page, draft, preview, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const pages = await pageStaticPathsQuery({ startsWith: "partner" });
  const paths = pages.map(partner => ({ params: { partner } }));
  return { paths, fallback: "blocking" };
};

export default PartnerPage;
