import type { Entry, ContentTypeLink, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { ColorNames } from './theme';
import type { FormModels } from './forms';

interface ContentRef {
  sys: ContentTypeLink;
}

type AssetFields = Asset['fields'];

export interface FooterLink {
  title: string;
  href: string;
  parent?: string;
  sortWeight: number;
}

export interface ExternalFooterLink {
  title: string;
  href: string;
  sortWeight?: number;
}

export interface FooterGroupEntry {
  title: string;
  sortWeight: number;
  externalLinks?: ContentRef[];
}

export interface FooterGroup extends Omit<FooterGroupEntry, 'externalLinks'> {
  externalLinks?: ExternalFooterLink[];
}

export interface FooterItem extends FooterLink {
  footerGroup: FooterGroupEntry;
}

export interface IGetStartedEntry {
  title: string;
  subtitle?: string;
  body?: Document;
  buttonText?: string;
  buttonLink?: string;
}

export interface PageAttrs {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body?: Document;
  footerGroup?: ContentRef;
  footerTitle?: string;
  customProperties?: object;
  getStarted?: Entry<IGetStartedEntry>;
}

export interface PageParsed extends Omit<PageAttrs, 'footerGroup'> {
  footerGroup: FooterGroupEntry;
}

export interface PageContentParsed extends Omit<PageContent, 'footerGroup' | 'page'> {
  footerGroup: FooterGroupEntry;
  page: PageAttrs;
}

export interface Paragraph {
  title: string;
  body: Document;
  icon?: AssetFields;
  iconColor?: ColorNames;
  buttonText?: string;
  buttonLink?: string;
}

export interface PageContent {
  page: ContentRef;
  sortWeight: number;
  title: string;
  subtitle?: string;
  body: Document | null;
  paragraphs: Paragraph[];
  updatedAt: string;
  button: boolean;
  buttonText?: string;
  buttonLink?: string;
  footerGroup?: ContentRef;
  footerTitle?: string;
  showUpdatedDate?: boolean;
  image?: AssetFields;
  showInCallToAction: boolean;
  callToActionIcon?: AssetFields;
  callToActionIconColor?: ColorNames;
  callToActionBody: Document | null;
}

export interface HomeSection {
  title: string;
  subtitle: string;
  body?: Document;
  showButton: boolean;
  buttonText: string;
  buttonLink: string;
  sortWeight: number;
  image: AssetFields;
}

export interface HeroCard {
  title: string;
  body: Document;
}

export interface HomepageContent {
  sections: HomeSection[];
  heroCards: HeroCard[];
}

export interface GeoPoint {
  coordinates: { lon: number; lat: number };
  active: boolean;
  displayName: string;
  id: string;
  description: string;
  testUrl: string;
  timeout: number;
}

export interface IMeasuredGeoPoint extends GeoPoint {
  elapsed: number;
  best: boolean;
}

export interface PageProps {
  pageData: PageAttrs;
  pageContent: PageContent[];
}

export interface IAboutPageAttrs extends PageAttrs {
  customProperties: { employeesTitle: string; mapTitle: string };
}

export interface IAboutPage extends PageProps {
  bios: Bio[];
  pageData: IAboutPageAttrs;
}

export interface Bio {
  name: string;
  title: string;
  bio: Document;
  photo: Asset['fields'];
  sortWeight: number;
}

interface Colors {
  themeName: string;
  [k: string]: string;
}

export interface Fonts {
  themeName: string;
  body: string;
  mono: string;
  hairline: number;
  thin: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface ThemeEntry {
  themeName: string;
  colors: Colors;
  fonts: Fonts;
}

export interface GlobalConfigPre {
  siteTitle: string;
  siteDescription: string;
  siteSlogan: string;
  orgName: string;
  titleOverrides: string[];
  theme: Entry<ThemeEntry>;
  twitterHandle?: string;
  facebookProfile?: string;
  linkedInProfile?: string;
  githubOrg?: string;
  subscribeTitle?: string;
  subscribePlaceholder?: string;
  subscribeSuccess?: string;
  subscribeGenericError?: string;
  subscribeDuration?: number;
  hqCoordinates?: { lon: number; lat: number };
  hqMapInfo?: Document;
  openMapsText?: string;
  hqAddress?: string;
  privacyBanner: Document;
  callToActionTitle: string;
  callsToActionShown: 1 | 2 | 3 | 4 | 5 | 6;
  homePageVideo?: string;
  errorMessage: Document;
}

export interface ThemeConfig {
  colors: Omit<Colors, 'themeName'>;
  fonts: Omit<Fonts, 'themeName'>;
}

export interface GlobalConfig extends Omit<GlobalConfigPre, 'theme'> {
  theme: ThemeConfig;
}

export type AnyEntry = Entry<PageAttrs | PageContent | FooterGroupEntry>;

export interface IContactCard {
  title: string;
  body: string;
  buttonText: string;
  color: ColorNames;
  icon: 'Support' | 'Sales' | 'Docs';
  sortWeight: number;
  form?: FormModels<'Support' | 'Sales'>;
}

export interface IFormPlaceholders {
  name: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  companyName: string;
  submitButton: string;
  details: string;
  interests: string;
  subject: string;
}

export interface IActions
  extends Pick<
    PageContentParsed,
    | 'page'
    | 'body'
    | 'title'
    | 'subtitle'
    | 'callToActionIcon'
    | 'callToActionBody'
    | 'callToActionIconColor'
  > {}

export type { Entry, EntryCollection } from 'contentful';
