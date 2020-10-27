import dynamic from 'next/dynamic';
import { Button, Wrap, useToken } from '@chakra-ui/core';
import { getPage, getPageContent, getGeoPoints } from 'site/util';
import { useColorValue } from 'site/context';
import { ContentSection, Hero, SEO, useDataCenter } from 'site/components';
import { useAlert } from 'site/hooks';
import { useCloudLocations } from 'site/state';

import type { CloudProps, GetStaticProps } from 'site/types';

import type { IUSMap } from 'site/components';

const USMap = dynamic<IUSMap>(() => import('site/components').then(i => i.USMap));

const SLUG = 'cloud';

export default function Cloud(props: CloudProps) {
  const { geoData, geoPoints, pageData, pageContent } = props;

  if (geoPoints.length === 0) {
    throw new Error('Unable to get Cloud Location Data');
  }
  const { title, subtitle, body = null } = pageData;
  const showAlert = useAlert();

  const mapColor = useColorValue(
    useToken('colors', 'blackAlpha.200'),
    useToken('colors', 'whiteAlpha.200'),
  );
  const markerColor = useColorValue(
    useToken('colors', 'primary.400'),
    useToken('colors', 'original.tertiary'),
  );
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);

  // Initialize test result state
  useCloudLocations(geoPoints);
  const { execute, isError, error, isFetching } = useDataCenter(geoPoints);

  // This will render twice in development due to react strict mode.
  isError && showAlert({ status: 'error', message: `${error}` });
  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body}>
        <Wrap justify="center" w="100%" mt={8} align="center" spacing={4}>
          <Button variant="heroPrimary" isLoading={isFetching} onClick={execute}>
            Find Your Edge Data Center
          </Button>
        </Wrap>
        <USMap
          geoData={geoData}
          mapColor={mapColor}
          locations={geoPoints}
          markerColor={markerColor}
          maxW={{ base: '100%', lg: '75%' }}
        />
      </Hero>
      {sections.map((sect, i) => {
        return <ContentSection items={sect} index={i} key={i} />;
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
