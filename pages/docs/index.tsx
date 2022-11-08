import { useRouter } from "next/router";

import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { DocsGroups, SEO, RichText } from "~/components";
import { useScaledText } from "~/hooks";
import { DocsLayout } from "~/layouts";
import { pageQuery } from "~/queries";

import type { GetStaticProps, NextPage } from "next";
import type { PageProps } from "~/types";

const TextContent = (props: PageProps) => {
  const { title, subtitle, body } = props;
  const fnTitle = useTitleCase();

  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([]);
  return (
    <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
      <Flex textAlign="center" flexDir="column" alignItems="center" ref={containerRef}>
        <Heading
          as="h1"
          fontSize={{ base: shouldResize ? "2xl" : "4xl", lg: "6xl" }}
          fontWeight="light"
          ref={headingRef}
        >
          {fnTitle(title)}
        </Heading>
        {subtitle && (
          <Heading as="h2" fontSize={{ base: "1.5rem", lg: "3xl" }} fontWeight="light">
            {fnTitle(subtitle)}
          </Heading>
        )}
      </Flex>
      <RichText content={body} />
    </Flex>
  );
};

const Docs: NextPage<PageProps> = props => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return (
      <DocsLayout>
        <Spinner size="xl" />
      </DocsLayout>
    );
  }
  const { title, subtitle } = props;
  return (
    <>
      <SEO title={title} description={subtitle ? subtitle : undefined} />
      <DocsLayout>
        <TextContent {...props} />
        <DocsGroups />
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async ctx => {
  const preview = ctx?.preview ?? false;
  const page = await pageQuery({ slug: "docs" });
  return { props: { ...page, preview } };
};

export default Docs;
