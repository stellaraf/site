import type { AppProps } from 'next/app';
import type { BoxProps } from '@chakra-ui/react';
import type { Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import type {
  IMeasuredGeoPoint,
  HomepageContent,
  IFormModelTrial,
  GlobalConfig,
  IContactCard,
  IDocsArticle,
  IDocsGroup,
  FooterItem,
  PageAttrs,
  PageProps,
  IActions,
  Bio,
} from 'site/types';

/**
 * _app (All Pages) Types
 */
export interface AppInitialProps {
  appProps: {
    globalConfig: GlobalConfig;
    footerGroups: FooterItem[];
    actions: IActions[];
    docsGroups: IDocsGroup[];
  };
  children?: React.ReactNode;
}

export type TSite = AppInitialProps & AppProps;

/**
 * Home Page Types
 */
export interface IHome {
  pageContent: HomepageContent;
}

/**
 * Cloud Page Types
 */
export interface ICloud extends PageProps {
  geoData: object;
  geoPoints: IMeasuredGeoPoint[];
}

/**
 * About Page Types
 */

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
 * Cloud Product Pages
 */

export interface IPartnerPage {
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
 * Docs Pages
 */
export interface IDocs {
  docsGroups: IDocsGroup[];
}

export interface IDocsGroupMain {
  pageData: IDocsGroup;
}

export interface IDocsMain {
  pageData: PageAttrs;
}

export interface IDocsArticlePage {
  article: IDocsArticle;
}
