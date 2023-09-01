import type { BoxProps } from "@chakra-ui/react";

export interface MapContainerProps extends BoxProps {
  bg: string;
  color: string;
}

export type MapStyles = google.maps.MapTypeStyle[];

export interface LocationProps extends BoxProps {
  orgName: string;
  address: string;
  color: string;
  lat: number;
  lng: number;
  bg: string;
}

export interface GoogleMapProps extends Omit<BoxProps, "bg" | "color"> {
  lat: number;
  lng: number;
  orgName: string;
  displayAddress: string;
}
