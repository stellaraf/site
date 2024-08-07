import { useRouter } from "next/router";

import { Box, Flex } from "@chakra-ui/react";

import { BlogPostContent, ContentLoader, ErrorAlert, SEO } from "~/components";
import { blogPostQuery, blogPostStaticPathsQuery, commonStaticPropsQuery } from "~/queries";
import { type BlogPostProps, Stage } from "~/types";

import type { BoxProps } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

type UrlQuery = {
  slug: string;
};

type StaticPaths = Awaited<ReturnType<GetStaticPaths<UrlQuery>>>["paths"];

const Layout = (props: React.PropsWithChildren<BoxProps & Pick<BlogPostProps, "title">>) => {
  const { title, children, ...rest } = props;

  return (
    <Box as="section" py={{ base: 16, lg: 32 }} overflow="hidden" {...rest}>
      <Flex height="100%" alignItems="center" flexDir="column" layerStyle="container">
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
          <ErrorAlert />
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
  if (slug === "notfound") {
    return { notFound: true };
  }
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  try {
    const page = await blogPostQuery({ slug, stage });
    const common = await commonStaticPropsQuery({ stage });
    return { props: { ...page, draft, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  let paths: StaticPaths = [];
  const posts = await blogPostStaticPathsQuery();
  try {
    for (const slug of posts) {
      paths = [...paths, { params: { slug } }];
    }
  } catch (error) {
    console.error(error);
  }
  return { paths, fallback: "blocking" };
};

export default Post;
