import { useRouter } from "next/router";

import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { DocsGroups, RichText } from "~/components";
import { useScaledText } from "~/hooks";
import { DocsLayout } from "~/layouts";
import { pageQuery, commonStaticPropsQuery } from "~/queries";
import { Stage, type PageProps } from "~/types";

import type { GetStaticProps, NextPage } from "next";

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
  return (
    <DocsLayout>
      <TextContent {...props} />
      <DocsGroups />
    </DocsLayout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async ctx => {
  const draft = ctx.draftMode ?? false;
  const stage = draft ? Stage.Draft : Stage.Published;
  const page = await pageQuery({ slug: "docs", stage });
  const common = await commonStaticPropsQuery({ stage });
  return { props: { ...page, common } };
};

export default Docs;
