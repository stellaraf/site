import { useRouter } from "next/router";

import { Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { ContentLoader, Error, SEO, RichText } from "~/components";
import { useScaledText } from "~/hooks";
import { DocsLayout } from "~/layouts";
import { docsGroupQuery } from "~/queries";

import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { DocsGroup } from "~/queries";

type UrlQuery = {
  group: string;
};

const Content = (props: DocsGroup) => {
  const { title, subtitle, summary } = props;
  const fnTitle = useTitleCase();

  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([title]);
  return (
    <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
      <Flex textAlign="center" flexDir="column" alignItems="center" ref={containerRef}>
        <Heading
          as="h1"
          fontSize={{ base: shouldResize ? "3xl" : "4xl", lg: "6xl" }}
          fontWeight="light"
          ref={headingRef}
        >
          {fnTitle(title)}
        </Heading>
        {subtitle && (
          <Heading
            as="h2"
            fontWeight="light"
            fontSize={{ base: "1.5rem", lg: "xl" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            {fnTitle(subtitle)}
          </Heading>
        )}
      </Flex>
      <RichText content={summary} />
    </Flex>
  );
};

const DocsGroupIndex: NextPage<DocsGroup> = props => {
  const { isFallback } = useRouter();

  if (!isFallback && !props) {
    return (
      <>
        <SEO title="Error" noindex nofollow />
        <DocsLayout>
          <Error />
        </DocsLayout>
      </>
    );
  }

  const { title, subtitle } = props;

  return (
    <>
      <SEO title={title} description={subtitle ? subtitle : undefined} />
      <DocsLayout>{!isFallback ? <Content {...props} /> : <ContentLoader />}</DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<DocsGroup, UrlQuery> = async ctx => {
  const group = ctx.params?.group ?? "";
  const preview = ctx?.preview ?? false;
  let notFound = false;
  let docsGroup = {} as DocsGroup;
  try {
    docsGroup = await docsGroupQuery({ slug: group });
  } catch (err) {
    console.error(err);
    notFound = true;
  }
  return { props: { ...docsGroup, notFound, preview } };
};

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => ({
  paths: [{ params: { group: "interconnection" } }, { params: { group: "orion" } }],
  fallback: true,
});

export default DocsGroupIndex;
