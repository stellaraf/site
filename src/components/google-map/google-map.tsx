import { useCallback } from "react";

import { Box, Skeleton, useColorModeValue } from "@chakra-ui/react";
import {
  GoogleMap as GoogleMapApi,
  MarkerF,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { Link, Error } from "~/components";
import { useColorTokenValue } from "~/hooks";

import { mapDark, mapLight } from "./styles";
import { gm, useMapUrl } from "./util";

import type { LocationProps, MapContainerProps, GoogleMapProps } from "./types";

const Location = (props: LocationProps) => {
  const { lat, lng, bg, color, orgName, address, ...rest } = props;
  const url = useMapUrl(address, orgName);

  return (
    <MarkerF position={{ lat, lng }}>
      <InfoWindow position={{ lat, lng }}>
        <Box pl={0} pt={0} pr={2} mb={2} w="auto" minW={32} textAlign="left" color={color} bg={bg}>
          <Box
            whiteSpace="pre"
            css={{
              "& h1,h2,h3,h4,h5,h6,a,p": { margin: "unset", padding: "unset" },
              "& h1,h2,h3,h4,h5,h6": { marginBottom: "0.5rem" },
            }}
            {...rest}
          >
            {address}
          </Box>
          <Box mt={2}>
            <Link href={url} fontWeight="medium">
              Visit Us!
            </Link>
          </Box>
        </Box>
      </InfoWindow>
    </MarkerF>
  );
};

const MapContainer = (props: MapContainerProps) => {
  const { bg, color, ...rest } = props;
  return (
    <Box
      h={{ base: "70vh", lg: "50vh" }}
      w="100%"
      my={12}
      css={{
        "& *": { zIndex: 2 },
        [`& ${gm.iw.c}`]: { backgroundColor: bg },
        [`& ${gm.iw.t}::after`]: { background: bg },
        [`& ${gm.iw.tc}::after`]: { background: bg },
        [`& ${gm.iw.img}`]: { filter: "invert(1)" },
        [`& ${gm.iw.d}`]: { overflow: "hidden !important" },
      }}
      {...rest}
    />
  );
};

export const GoogleMap = (props: GoogleMapProps) => {
  const { lat, lng, orgName, displayAddress, ...rest } = props;

  const bg = useColorTokenValue("light.500", "dark.500");
  const color = useColorTokenValue("dark.500", "light.500");
  const styles = useColorModeValue(mapLight, mapDark);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_KEY ?? "",
  });

  const renderMap = useCallback(
    () => (
      <GoogleMapApi
        zoom={13.5}
        options={{ styles }}
        center={{ lat, lng }}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Location
          bg={bg}
          lat={lat}
          lng={lng}
          color={color}
          address={displayAddress}
          orgName={orgName}
        />
      </GoogleMapApi>
    ),
    [isLoaded, loadError, bg],
  );

  return (
    <MapContainer bg={bg} color={color} {...rest}>
      {typeof loadError !== "undefined" ? (
        <Error title="Error loading Google Map" description={loadError.message} />
      ) : isLoaded ? (
        renderMap()
      ) : (
        <Skeleton boxSize="100%" />
      )}
    </MapContainer>
  );
};
