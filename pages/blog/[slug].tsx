import { useRouter } from "next/router";

import { Box, Flex } from "@chakra-ui/react";

import { SEO, Error, ContentLoader, BlogPostContent } from "~/components";
import { useResponsiveStyle } from "~/hooks";
import { blogPostQuery, commonStaticPropsQuery, blogPostStaticPathsQuery } from "~/queries";

import type { BoxProps } from "@chakra-ui/react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { BlogPostProps } from "~/types";

type UrlQuery = {
  slug: string;
};

type StaticPaths = Awaited<ReturnType<GetStaticPaths<UrlQuery>>>["paths"];

const Layout = (props: React.PropsWithChildren<BoxProps & Pick<BlogPostProps, "title">>) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();

  return (
    <Box as="section" py={{ base: 16, lg: 32 }} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        {children}
      </Flex>
    </Box>
  );
};

const Post: NextPage<BlogPostProps> = props => {
  const { title, description } = props;
  const { isFallback } = useRouter();

  if (!isFallback && !title) {
    return (
      <>
        <SEO title="Error" noindex nofollow />
        <Layout title="Error">
          <Error />
        </Layout>
      </>
    );
  }

  if (isFallback) {
    return (
      <Layout title={title}>
        <ContentLoader />
      </Layout>
    );
  }

  return (
    <>
      <SEO title={title} description={description} />
      <Layout title={title}>
        <BlogPostContent {...props} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPostProps, UrlQuery> = async ctx => {
  const slug = ctx.params?.slug ?? "notfound";
  const preview = ctx?.preview ?? false;

  if (slug === "notfound") {
    return { notFound: true };
  }
  try {
    const page = await blogPostQuery({ slug });
    const common = await commonStaticPropsQuery();
    return { props: { ...page, preview, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  let paths: StaticPaths = [];
  const posts = await blogPostStaticPathsQuery();
  for (const slug of posts) {
    paths = [...paths, { params: { slug } }];
  }
  return { paths, fallback: false };
};

export default Post;