import { useRouter } from "next/router";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Groups, SEO } from "~/components";
import { useRender, useScaledText } from "~/hooks";
import { DocsLayout } from "~/layouts";
import { getPage, getPageId } from "~/util";

import type { GetStaticProps } from "next";
import type { PageEntry, IDocsMain } from "~/types";

const TextContent: React.FC<IDocsMain["pageData"]> = (props: IDocsMain["pageData"]) => {
  const { title, subtitle, body = null } = props;
  const titleMe = useTitleCase();
  const renderedBody = useRender(body);
  const [containerRef, headingRef, shouldResize] = useScaledText<HTMLDivElement>([]);
  return (
    <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
      <Flex textAlign="center" flexDir="column" alignItems="center" ref={containerRef}>
        <Heading as="h1" fontSize={{ base: shouldResize ? "2xl" : "4xl", lg: "6xl" }} fontWeight="light" ref={headingRef}>
          {titleMe(title)}
        </Heading>
        {subtitle && (
          <Heading as="h2" fontSize={{ base: "1.5rem", lg: "3xl" }} fontWeight="light">
            {titleMe(subtitle)}
          </Heading>
        )}
      </Flex>
      {body && renderedBody}
    </Flex>
  );
};

const Docs: React.FC<PageEntry<IDocsMain>> = (props: PageEntry<IDocsMain>) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return (
      <DocsLayout>
        <Spinner size="xl" />
      </DocsLayout>
    );
  }
  const { pageData } = props;
  const { title, subtitle } = pageData.fields;
  return (
    <>
      <SEO title={title} description={subtitle} />
      <DocsLayout>
        <TextContent {...pageData.fields} />
        <Groups />
      </DocsLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<PageEntry<IDocsMain>> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<IDocsMain>["pageData"];

  try {
    const pageId = await getPageId("docs", preview);
    pageData = await getPage<IDocsMain["pageData"]>(pageId, preview);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, preview } };
};

export default Docs;
