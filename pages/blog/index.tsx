import { useRouter } from "next/router";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { SEO, Error, ContentLoader, Hero, BlogPosts, Testimonials, Callout } from "~/components";
import { useResponsiveStyle } from "~/hooks";
import { pageQuery, blogPostsQuery, commonStaticPropsQuery } from "~/queries";

import type { BoxProps } from "@chakra-ui/react";
import type { NextPage, GetStaticProps } from "next";
import type { BlogPageProps } from "~/types";

const Layout = (props: React.PropsWithChildren<BoxProps & Pick<BlogPageProps, "title">>) => {
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

const Page: NextPage<BlogPageProps> = props => {
  const { title, subtitle, body, callout, blogPosts } = props;
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
      <Hero title={title} subtitle={subtitle} body={body} minH="20vh" />
      <BlogPosts blogPosts={blogPosts} />
      {callout && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async ctx => {
  const preview = ctx?.preview ?? false;

  try {
    const blogPosts = await blogPostsQuery();
    const page = await pageQuery({ slug: "blog" });
    const common = await commonStaticPropsQuery();
    return { props: { ...page, blogPosts, preview, common } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Page;
