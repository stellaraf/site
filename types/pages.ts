import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { BoxProps } from '@chakra-ui/core';
import type {
  HomepageContent,
  HomeSection,
  GlobalConfig,
  GeoPoint,
  PageProps,
  Bio,
  BioEntry,
} from 'site/types';

/**
 * _app (All Pages) Types
 */

export interface SiteProps extends AppProps {
  appProps: GlobalConfig;
  children?: ReactNode;
}

/**
 * Home Page Types
 */
export interface HomeProps {
  pageContent: HomepageContent;
  globalConfig: GlobalConfig;
}

export interface HomeStaticProps {
  props: { pageContent: HomeProps };
}

export interface SectionProps {
  section: HomeSection;
  index: number;
  [k: string]: any;
}

/**
 * Cloud Page Types
 */
export interface CloudProps extends PageProps {
  geoData: object;
  geoPoints: GeoPoint[];
}

/**
 * About Page Types
 */
export interface AboutProps extends PageProps {
  bios: BioEntry;
}

export interface BioSectionProps extends BoxProps {
  bios: Bio[];
}

/**
 * Passthrough Types
 */

export type { NextPage } from 'next';
