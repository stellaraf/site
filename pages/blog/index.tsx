import { useRouter } from "next/router";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import {
  SEO,
  ErrorAlert,
  ContentLoader,
  Hero,
  BlogPosts,
  Testimonials,
  Callout,
} from "~/components";
import { pageQuery, blogPostsQuery, commonStaticPropsQuery } from "~/queries";
import { Stage, type BlogPageProps } from "~/types";

import type { BoxProps } from "@chakra-ui/react";
import type { NextPage, GetStaticProps } from "next";

const Layout = (props: React.PropsWithChildren<BoxProps & Pick<BlogPageProps, "title">>) => {
  const { title, children, ...rest } = props;
  const fnTitle = useTitleCase();

  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" layerStyle="container" alignItems="center" flexDir="column">
        <Heading as="h3" fontSize="4xl">
          {fnTitle(title)}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

const Page: NextPage<BlogPageProps> = props => {
  const { title, subtitle, body, callout, blogPosts } = props;
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
      <>
        <Hero title={title} subtitle={subtitle} body={body} />
        <ContentLoader />
      </>
    );
  }

  return (
    <>
      <Hero title={title} subtitle={subtitle} body={body} minH="20vh" />
      <BlogPosts blogPosts={blogPosts} />
      {callout && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async ctx => {
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;

  try {
    const blogPosts = await blogPostsQuery({ stage });
    const page = await pageQuery({ slug: "blog", stage });
    const common = await commonStaticPropsQuery({ stage });
    return { props: { ...page, draft, blogPosts, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Page;
