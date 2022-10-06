import { useCallback } from "react";

import { Box, Skeleton } from "@chakra-ui/react";
import {
  GoogleMap as GoogleMapApi,
  MarkerF,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { Link, Error } from "~/components";
import { useConfig, useColorValue, useColorTokenValue } from "~/context";
import { useRender } from "~/hooks";

import { mapDark, mapLight } from "./styles";
import { gm, useMapUrl } from "./util";

import type { LocationProps, MapContainerProps } from "./types";

const Location = (props: LocationProps) => {
  const { lat, lng, content, bg, color, openMapsText, orgName, address, ...rest } = props;
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
            {content}
          </Box>
          <Box mt={2}>
            <Link href={url} fontWeight="medium">
              {openMapsText}
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

export const GoogleMap = (): JSX.Element => {
  const {
    orgName,
    hqMapInfo,
    hqAddress = "",
    openMapsText = "",
    hqCoordinates = { lat: 0, lon: 0 },
  } = useConfig();

  const { lat, lon: lng } = hqCoordinates;

  const renderedInfoContent = useRender(hqMapInfo);

  const bg = useColorTokenValue("light.500", "dark.500");
  const color = useColorTokenValue("dark.500", "light.500");
  const styles = useColorValue(mapLight, mapDark);

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
          address={hqAddress}
          color={color}
          orgName={orgName}
          openMapsText={openMapsText}
          content={renderedInfoContent}
        />
      </GoogleMapApi>
    ),
    [isLoaded, loadError, bg],
  );

  return (
    <MapContainer bg={bg} color={color}>
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
