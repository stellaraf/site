import type { BoxProps } from "@chakra-ui/react";

export interface MapContainerProps extends BoxProps {
  bg: string;
  color: string;
}

export type MapStyles = google.maps.MapTypeStyle[];

export interface LocationProps extends BoxProps {
  content: React.ReactNode;
  openMapsText: string;
  orgName: string;
  address: string;
  color: string;
  lat: number;
  lng: number;
  bg: string;
}
