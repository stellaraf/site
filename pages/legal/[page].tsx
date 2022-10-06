import { Box } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { SEO, ContentSection } from "~/components";
import { getPage, getPageContent, getPageId } from "~/util";

import type { GetStaticProps, GetStaticPaths } from "next";
import type { PageEntry, ILegalPage, PageContent } from "~/types";

type UrlQuery = {
  page: string;
};

const LegalPage = (props: PageEntry<ILegalPage>) => {
  const { pageData, pageContent } = props;
  const { title, subtitle } = pageData.fields;
  const fnTitle = useTitleCase();
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  return (
    <>
      <SEO title={fnTitle(title)} description={subtitle} />
      <Box minH="10vh" />
      {sections.map((sect, i) => {
        return <ContentSection index={i} items={sect} key={i} />;
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps<PageEntry<ILegalPage>, UrlQuery> = async ctx => {
  const page = ctx.params?.page ?? "";
  const preview = ctx?.preview ?? false;
  let pageData = {} as PageEntry<ILegalPage>["pageData"];
  let pageContent = [] as PageContent[];
  try {
    const pageId = await getPageId(`legal/${page}`, preview);
    pageData = await getPage(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent, preview } };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { page: "privacy" } }, { params: { page: "msa" } }],
  fallback: false,
});

export default LegalPage;
