import dynamic from "next/dynamic";

import { Button, Wrap } from "@chakra-ui/react";

import { ContentSection, Hero, SEO, useDataCenter, Callout, Testimonials } from "~/components";
import { useColorTokenValue, CloudLocationsProvider } from "~/context";
import { useAlert } from "~/hooks";
import { is } from "~/lib";
import { pageQuery, cloudLocationsQuery, commonStaticPropsQuery } from "~/queries";

import type { GetStaticProps, NextPage } from "next";
import type { USMapProps } from "~/components";
import type { CloudPageProps } from "~/types";

const USMap = dynamic<USMapProps>(() => import("~/components").then(i => i.USMap));

type ContentProps = React.PropsWithChildren<Pick<CloudPageProps, "title" | "subtitle" | "body">>;

const Content = (props: ContentProps) => {
  const { title, subtitle, body = null } = props;
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

const Cloud: NextPage<CloudPageProps> = props => {
  const { geoData, locations, title, subtitle, body, callout, contents } = props;

  const mapColor = useColorTokenValue("blackAlpha.200", "whiteAlpha.200");
  const markerColor = useColorTokenValue("primary.400", "tertiary.500");

  return (
    <>
      <SEO title={title} description={subtitle ?? undefined} />
      <CloudLocationsProvider value={locations}>
        <Content title={title} subtitle={subtitle} body={body}>
          <USMap
            geoData={geoData}
            mapColor={mapColor}
            markerColor={markerColor}
            maxW={{ base: "100%", lg: "75%" }}
          />
        </Content>
      </CloudLocationsProvider>
      {contents.map((sect, i) => {
        return <ContentSection index={i} key={sect.title} content={sect} />;
      })}
      {is(callout) && <Callout {...callout} />}
      <Testimonials />
    </>
  );
};

export const getStaticProps: GetStaticProps<CloudPageProps> = async ctx => {
  const preview = ctx?.preview ?? false;
  const geoRes = await fetch("https://us-map-geo-points.stellar.workers.dev");
  const geoData = await geoRes.json();
  const locations = await cloudLocationsQuery();
  const page = await pageQuery({ slug: "cloud" });
  const common = await commonStaticPropsQuery();
  return { props: { ...page, geoData, preview, locations, common } };
};

export default Cloud;
