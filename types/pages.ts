import type { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { BoxProps } from '@chakra-ui/core';
import type {
  HomepageContent,
  GlobalConfig,
  PageAttrs,
  PageProps,
  Bio,
  BioEntry,
  FooterItem,
  IContactCard,
  IFormPlaceholders,
  IFormModelTrial,
  IActions,
  IMeasuredGeoPoint,
} from 'site/types';

import type { Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/**
 * _app (All Pages) Types
 */
export interface AppInitialProps {
  appProps: { globalConfig: GlobalConfig; footerGroups: FooterItem[]; actions: IActions[] };
  children?: ReactNode;
}

export type SiteProps = AppInitialProps & AppProps;

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
  geoPoints: IMeasuredGeoPoint[];
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
 * Contact Page Types
 */

interface IContactCustomProperties {
  metaTitle: string;
}

export interface IContactPage extends Omit<PageProps, 'pageData'> {
  pageData: PageAttrs & { customProperties: IContactCustomProperties };
  contactCards: IContactCard[];
  formPlaceholders: IFormPlaceholders;
}

/**
 * Legal Page Types (Dynamic)
 */

export interface ILegalPage extends PageProps {}

export interface IVendorPage {
  pageData: {
    name: string;
    logo: Asset['fields'];
    logoColorLightMode: string;
    logoColorDarkMode: string;
    title: string;
    subtitle: string;
    body?: Document;
    trialForm?: IFormModelTrial;
    partnerLogo?: Asset['fields'];
  };
}

/**
 * Passthrough Types
 */
export type { NextPage } from 'next';
