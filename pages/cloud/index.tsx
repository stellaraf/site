import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Button, Wrap } from "@chakra-ui/react";

import { ContentSection, Hero, SEO, useDataCenter, GetStarted, Testimonials } from "~/components";
import { useColorTokenValue, CloudLocationsProvider } from "~/context";
import { useAlert } from "~/hooks";
import { getPage, getPageContent, getOrionLocations, getPageId } from "~/util";

import type { USMapProps } from "~/components";
import type { ICloud, IMeasuredGeoPoint, PageContent, PageEntry } from "~/types";

const USMap = dynamic<USMapProps>(() => import("~/components").then(i => i.USMap));

type ContentProps = React.PropsWithChildren<Pick<PageEntry<ICloud>, "pageData">>;

const Content = (props: ContentProps) => {
  const { title, subtitle, body = null } = props.pageData.fields;
  const { execute, isError, error, isFetching } = useDataCenter();
  const showAlert = useAlert();

  // This will render twice in development due to react strict mode.
  isError && showAlert({ status: "error", message: `${error}` });

  return (
    <Hero title={title} subtitle={subtitle} body={body}>
      <Wrap justify="center" w="100%" mt={8} align="center" spacing={4}>
        <Button variant="heroPrimary" isLoading={isFetching} onClick={execute}>
          Find Your Edge Data Center
        </Button>
      </Wrap>
      {props.children}
    </Hero>
  );
};

const Cloud = (props: PageEntry<ICloud>) => {
  const { geoData, geoPoints, pageData, pageContent } = props;

  if (geoPoints.length === 0) {
    throw new Error("Unable to get Cloud Location Data");
  }
  const { title, subtitle, getStarted } = pageData.fields;

  const mapColor = useColorTokenValue("blackAlpha.200", "whiteAlpha.200");
  const markerColor = useColorTokenValue("primary.400", "tertiary.500");

  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <CloudLocationsProvider value={geoPoints}>
        <Content pageData={pageData}>
          <USMap
            geoData={geoData}
            mapColor={mapColor}
            markerColor={markerColor}
            maxW={{ base: "100%", lg: "75%" }}
          />
        </Content>
      </CloudLocationsProvider>
      {sections.map((sect, i) => {
        return <ContentSection items={sect} index={i} key={i} />;
      })}
      {getStarted && <GetStarted {...getStarted.fields} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageEntry<ICloud>> = async ctx => {
  const preview = ctx?.preview ?? false;
  let geoData = {} as Dict;
  let geoPoints = [] as IMeasuredGeoPoint[];
  let pageData = {} as PageEntry<ICloud>["pageData"];
  let pageContent = [] as PageContent[];

  try {
    const pageId = await getPageId("cloud", preview);
    const geoRes = await fetch("https://us-map-geo-points.stellar.workers.dev");
    geoData = await geoRes.json();
    geoPoints = await getOrionLocations();
    pageData = await getPage(pageId, preview);
    pageContent = await getPageContent(pageId, preview);
  } catch (err) {
    console.error(err);
  }
  return { props: { geoData, geoPoints, pageData, pageContent, preview } };
};

export default Cloud;
