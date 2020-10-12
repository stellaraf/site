import * as React from 'react';
import dynamic from 'next/dynamic';
import { Wrap } from '@chakra-ui/core';
import { getPage, getPageContent, getGeoPoints } from 'site/util';
import { useColorValue, useTheme } from 'site/context';
import { Button, ContentSection, Hero, SEO } from 'site/components';
import { useRender } from 'site/hooks';

import type { CloudProps, GetStaticProps } from 'site/types';
import type { MapProps } from 'site/components';

const USMap = dynamic<MapProps>(() => import('site/components').then(i => i.USMap));

const SLUG = 'cloud';

export default function Cloud(props: CloudProps) {
  const { geoData, geoPoints, pageData, pageContent } = props;
  const { title, subtitle, body } = pageData;
  const renderedBody = useRender(body);

  const { colors } = useTheme();
  const mapColor = useColorValue(colors.blackAlpha[200], colors.whiteAlpha[200]);
  const markerColor = useColorValue(colors.primary[400], colors.tertiary[400]);

  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={renderedBody}>
        <Wrap justify="center" w="100%" mt={8} align="center" spacing={4}>
          <Button href="#" variant="heroPrimary">
            Find Your Edge Data Center
          </Button>
          <Button href="#" variant="heroSecondary">
            Learn More
          </Button>
        </Wrap>
        <USMap
          maxW={{ base: '100%', lg: '75%' }}
          geoData={geoData}
          locations={geoPoints}
          mapColor={mapColor}
          markerColor={markerColor}
        />
      </Hero>
      {sections.map((sect, i) => {
        return <ContentSection items={sect} key={i} />;
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let geoData = Object();
  let geoPoints = Array();
  let pageData = Object();
  let pageContent = Array();
  try {
    const geoRes = await fetch('https://us-map-geo-points.stellar.workers.dev');
    geoData = await geoRes.json();
    geoPoints = await getGeoPoints();
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { geoData, geoPoints, pageData, pageContent } };
};
