import { useRouter } from "next/router";

import { Box, Flex, Heading, Tag } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { SEO, Error, ContentLoader, Hero, BlogPosts, Testimonials, Callout } from "~/components";
import {
  pageQuery,
  blogPostsByTagsQuery,
  commonStaticPropsQuery,
  contentTagsQuery,
} from "~/queries";
import { Stage, type BlogTagPageProps } from "~/types";

import type { BoxProps } from "@chakra-ui/react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

type Query = {
  tag: string;
};

const Layout = (props: React.PropsWithChildren<BoxProps & Pick<BlogTagPageProps, "title">>) => {
  const { title, children, ...rest } = props;
  const fnTitle = useTitleCase();

  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" alignItems="center" flexDir="column" layerStyle="container">
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
  const pathTag = ctx.params?.tag;
  if (typeof pathTag === "undefined") {
    return { redirect: { destination: "/blog", statusCode: 302 } };
  }
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  try {
    const common = await commonStaticPropsQuery({ stage });
    const page = await pageQuery({ slug: "blog", stage });
    const { blogPosts, tag } = await blogPostsByTagsQuery({ tag: pathTag, stage });
    return { props: { ...page, blogPosts, draft, common, tag } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const tags = await contentTagsQuery({});
  const paths = tags.map(tag => ({ params: { tag } }));
  return { paths, fallback: "blocking" };
};

export default Page;
