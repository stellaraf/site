import type { ReactNode } from 'react';
import type { BoxProps } from '@chakra-ui/core';
import type { LinkProps } from 'site/components';

export interface IMapContainer extends BoxProps {
  bg: string;
  color: string;
}

export type MapStyles = google.maps.MapTypeStyle[];

export interface ILocation extends BoxProps {
  lat: number;
  lng: number;
  content: ReactNode;
  bg: string;
  color: string;
  openMapsText: string;
  orgName: string;
  address: string;
}
