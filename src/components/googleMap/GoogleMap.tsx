import { Box } from '@chakra-ui/react';
import { GoogleMap as GoogleMapApi, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from '~/components';
import { useConfig, useColorValue, useColorTokenValue } from '~/context';
import { useRender } from '~/hooks';
import { gm, useMapUrl } from './util';
import { mapThemeDark } from './mapStyles';

import type { IMapContainer, ILocation } from './types';

const Location: React.FC<ILocation> = (props: ILocation) => {
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
            {...rest}
          >
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

const MapContainer: React.FC<IMapContainer> = (props: IMapContainer) => {
  const { bg, color, ...rest } = props;
  return (
    <Box
      h={{ base: '70vh', lg: '50vh' }}
      w="100%"
      my={12}
      css={{
        '& *': { zIndex: 2 },
        [`& ${gm.iw.c}`]: { backgroundColor: bg },
        [`& ${gm.iw.t}::after`]: { background: bg },
        [`& ${gm.iw.img}`]: { filter: 'invert(1)' },
        [`& ${gm.iw.d}`]: { overflow: 'hidden !important' },
      }}
      {...rest}
    />
  );
};

export const GoogleMap: React.FC = () => {
  const {
    orgName,
    hqMapInfo,
    hqAddress = '',
    openMapsText = '',
    hqCoordinates = { lat: 0, lon: 0 },
  } = useConfig();
  const { lat, lon: lng } = hqCoordinates;

  const renderedInfoContent = useRender(hqMapInfo);

  const bg = useColorTokenValue('light.500', 'dark.500');
  const color = useColorTokenValue('dark.500', 'light.500');
  const mapOptions = useColorValue({ styles: [] }, { styles: mapThemeDark });

  return (
    <MapContainer bg={bg} color={color}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GMAPS_KEY ?? ''}>
        <GoogleMapApi
          zoom={13.5}
          options={mapOptions}
          center={{ lat, lng }}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
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
