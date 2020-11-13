import { Box } from '@chakra-ui/react';
import { GoogleMap as GoogleMapApi, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'site/components';
import { useConfig, useColorValue, useTheme } from 'site/context';
import { useRender } from 'site/hooks';
import { gm, useMapUrl } from './util';
import { mapThemeDark } from './mapStyles';

import type { IMapContainer, ILocation } from './types';

const Location = (props: ILocation) => {
  const { lat, lng, content, bg, color, openMapsText, orgName, address, ...rest } = props;
  const url = useMapUrl(address, orgName);
  return (
    <Marker position={{ lat, lng }}>
      <InfoWindow>
        <Box pl={0} pt={0} pr={2} mb={2} w="auto" minW={32} textAlign="left" color={color} bg={bg}>
          <Box
            whiteSpace="pre"
            css={{
              '& h1,h2,h3,h4,h5,h6,a,p': { margin: 'unset', padding: 'unset' },
              '& h1,h2,h3,h4,h5,h6': { marginBottom: '0.5rem' },
            }}
            {...rest}>
            {content}
          </Box>
          <Box mt={2}>
            <Link href={url} fontWeight="medium">
              {openMapsText}
            </Link>
          </Box>
        </Box>
      </InfoWindow>
    </Marker>
  );
};

const MapContainer = (props: IMapContainer) => {
  const { bg, color, ...rest } = props;
  return (
    <Box
      h={{ base: '70vh', lg: '50vh' }}
      w="100%"
      my={12}
      css={{
        '& *': { zIndex: 2 },
        [`& ${gm.iw.t}::after`]: { background: bg },
        [`& ${gm.iw.c}`]: { backgroundColor: bg },
        [`& ${gm.iw.d}`]: { overflow: 'hidden !important' },
        [`& ${gm.iw.img}`]: { filter: 'invert(1)' },
      }}
      {...rest}
    />
  );
};

export const GoogleMap = () => {
  const {
    hqCoordinates = { lat: 0, lon: 0 },
    hqMapInfo,
    openMapsText = '',
    orgName,
    hqAddress = '',
  } = useConfig();
  const { colors } = useTheme();
  const { lat, lon: lng } = hqCoordinates;
  const renderedInfoContent = useRender(hqMapInfo);
  const bg = useColorValue(colors.original.light, colors.original.dark);
  const color = useColorValue(colors.original.dark, colors.original.light);
  const mapOptions = useColorValue({ styles: [] }, { styles: mapThemeDark });
  return (
    <MapContainer bg={bg} color={color}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GMAPS_KEY ?? ''}>
        <GoogleMapApi
          center={{ lat, lng }}
          zoom={13.5}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={mapOptions}>
          <Location
            bg={bg}
            lat={lat}
            lng={lng}
            address={hqAddress}
            color={color}
            orgName={orgName}
            openMapsText={openMapsText}
            content={renderedInfoContent}
          />
        </GoogleMapApi>
      </LoadScript>
    </MapContainer>
  );
};
