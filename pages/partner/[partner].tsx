import NextError from "next/error";
import { useRouter } from "next/router";

import { SEO, ContentLoader } from "~/components";
import { PartnerLayout, FallbackLayout } from "~/layouts";
import { pageQuery } from "~/queries";

import ErrorPage from "../_error";

import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { PageProps } from "~/types";

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

  const { title, subtitle } = props;

  if (typeof title === "undefined") {
    return <NextError statusCode={400} />;
  }

  return (
    <>
      <SEO title={title} description={subtitle ?? undefined} />
      <PartnerLayout {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async ctx => {
  const partner = ctx.params?.partner;
  const preview = ctx?.preview ?? false;

  if (typeof partner === "undefined") {
    return { notFound: true };
  }
  try {
    const page = await pageQuery({ slug: `partner/${partner}` });
    return { props: { ...page, preview } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { partner: "vmware" } }, { params: { partner: "veeam" } }],
  fallback: true,
});

export default PartnerPage;
