import { useRouter } from "next/router";

import { Box, Flex, Heading, Tag } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { SEO, Error, ContentLoader, Hero, BlogPosts, Testimonials, Callout } from "~/components";
import { useResponsiveStyle } from "~/hooks";
import {
  pageQuery,
  blogPostsByTagsQuery,
  commonStaticPropsQuery,
  blogPostTagsQuery,
} from "~/queries";

import type { BoxProps } from "@chakra-ui/react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { BlogTagPageProps } from "~/types";

type Query = {
  tag: string;
};

const Layout = (props: React.PropsWithChildren<BoxProps & Pick<BlogTagPageProps, "title">>) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  const fnTitle = useTitleCase();

  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {fnTitle(title)}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

const Page: NextPage<BlogTagPageProps> = props => {
  const { title, subtitle, body, callout, blogPosts, tag } = props;
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
      <>
        <Hero title={title} subtitle={subtitle} body={body} />
        <ContentLoader />
      </>
    );
  }

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} minH="20vh"></Hero>
      <BlogPosts blogPosts={blogPosts}>
        <Tag py={2} fontSize="xl">
          {tag}
        </Tag>
      </BlogPosts>
      {callout && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogTagPageProps, Query> = async ctx => {
  const preview = ctx?.preview ?? false;
  const pathTag = ctx.params?.tag;
  if (typeof pathTag === "undefined") {
    return { redirect: { destination: "/blog", statusCode: 302 } };
  }
  try {
    const common = await commonStaticPropsQuery();
    const page = await pageQuery({ slug: "blog" });
    const { blogPosts, tag } = await blogPostsByTagsQuery({ tag: pathTag });
    return { props: { ...page, blogPosts, preview, common, tag } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const tags = await blogPostTagsQuery({});
  const paths = tags.map(tag => ({ params: { tag } }));
  return { paths, fallback: false };
};

export default Page;
