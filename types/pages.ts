import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { BoxProps } from '@chakra-ui/core';
import type {
  HomepageContent,
  GlobalConfig,
  GeoPoint,
  PageProps,
  Bio,
  BioEntry,
  FooterItem,
} from 'site/types';

/**
 * _app (All Pages) Types
 */
export interface SiteProps extends AppProps {
  appProps: { globalConfig: GlobalConfig; footerGroups: FooterItem[] };
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

export interface ISection extends BoxProps {
  title: string;
}

export interface IBioSection extends ISection {
  bios: Bio[];
}

export interface IMapSection extends ISection {}

/**
 * Passthrough Types
 */
export type { NextPage } from 'next';
