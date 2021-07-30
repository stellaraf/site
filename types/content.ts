import type { Entry, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { ColorNames } from './theme';
import type { FormModel, FormModelEntry, TFormModelTrial } from './forms';

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
  externalLinks?: Entry<ExternalFooterLink>[];
}

export interface FooterGroup extends Omit<FooterGroupEntry, 'externalLinks'> {
  externalLinks?: ExternalFooterLink[];
}

export interface FooterItem extends FooterLink {
  footerGroup: FooterGroupEntry;
}

export interface FooterItemEntry extends Pick<PageAttrs, 'title' | 'slug' | 'footerTitle'> {
  sortWeight?: number;
  footerGroup: Entry<FooterGroupEntry>;
}

export interface IGetStartedEntry {
  title: string;
  subtitle?: string;
  body?: Document;
  buttonText?: string;
  buttonLink?: string;
}

export type PageAttrs = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body?: Document;
  footerGroup?: Entry<FooterGroupEntry>;
  footerTitle?: string;
  customProperties?: Dict;
  getStarted?: Entry<IGetStartedEntry>;
};

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
  icon?: Asset;
  iconColor?: ColorNames;
  buttonText?: string;
  buttonLink?: string;
}

export type PageContentEntry = {
  page: Entry<PageAttrs>;
  sortWeight: number;
  title: string;
  subtitle?: string;
  body: Document | null;
  paragraphs: Entry<Paragraph>[];
  updatedAt: string;
  button: boolean;
  buttonText?: string;
  buttonLink?: string;
  footerGroup?: Entry<FooterGroupEntry>;
  footerTitle?: string;
  showUpdatedDate?: boolean;
  image?: Asset;
  showInCallToAction: boolean;
  callToActionIcon?: Asset;
  callToActionIconColor?: ColorNames;
  callToActionBody: Document | null;
  form?: Entry<TFormModelTrial>;
};

export type PageContent = {
  page: Entry<PageAttrs>;
  sortWeight: number;
  title: string;
  subtitle?: string;
  body: Document | null;
  paragraphs: Entry<Paragraph>[];
  updatedAt: string;
  button: boolean;
  buttonText?: string;
  buttonLink?: string;
  footerGroup?: Entry<FooterGroupEntry>;
  footerTitle?: string;
  showUpdatedDate?: boolean;
  image?: Asset;
  showInCallToAction: boolean;
  callToActionIcon?: Asset;
  callToActionIconColor?: ColorNames;
  callToActionBody: Document | null;
  form?: TFormModelTrial;
};

export interface HomeSection {
  title: string;
  subtitle: string;
  body?: Document;
  showButton: boolean;
  buttonText: string;
  buttonLink: string;
  sortWeight: number;
  image: Asset;
}

export interface HeroCard {
  title: string;
  body: Document;
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

export interface Bio {
  name: string;
  title: string;
  bio: Document;
  photo: Asset;
  sortWeight: number;
}

type Colors = {
  themeName: string;
  [k: string]: string;
};

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
  colors: Entry<Colors>;
  fonts: Entry<Fonts>;
}

export interface GlobalConfigEntry {
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

export type ThemeConfig = {
  colors: Omit<Colors, 'themeName'>;
  fonts: Omit<Fonts, 'themeName'>;
};

export interface GlobalConfig extends Omit<GlobalConfigEntry, 'theme'> {
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
  form?: FormModel<'Support' | 'Sales'>;
}

export interface IContactCardEntry extends Omit<IContactCard, 'form'> {
  form?: FormModelEntry<'Support' | 'Sales'>;
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

export type TActions = Pick<
  PageContent,
  | 'body'
  | 'page'
  | 'title'
  | 'subtitle'
  | 'callToActionBody'
  | 'callToActionIcon'
  | 'callToActionIconColor'
> & { showInCallToAction: true };

export type IDocsGroupEntry = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: Document;
  sortWeight?: number;
  footerTitle?: string;
  footerGroup?: Entry<FooterGroupEntry>;
  showInCallToAction: boolean;
  callToActionBody?: Document;
  callToActionIcon?: Asset;
  callToActionIconColor?: ColorNames;
};

export type IDocsGroup = IDocsGroupEntry & {
  items: IDocsArticle[];
};

export interface IDocsArticle {
  title: string;
  slug: string;
  description: string;
  docsGroup?: Entry<IDocsGroupEntry>;
  updatedAt: string;
  showUpdatedDate: boolean;
  body: Document;
  children?: React.ReactNode;
}

export type TArticleButton = {
  text: string;
  link: string;
};

export type TAdmonitionTypes = 'Note' | 'Tip' | 'Information' | 'Warning' | 'Critical';

export type TAdmonition = {
  title?: string;
  body: Document;
  type?: TAdmonitionTypes;
};

export type TCustomBlocks =
  | TArticleButton
  | TMarkdownBlock
  | TAdmonition
  | TTableEntry
  | TExpandable;

export type TTableEntry = {
  name: string;
  data: { tableData: string[][]; useColumnHeader: boolean; useRowHeader: boolean };
};

export type TExpandable = {
  title: string;
  body: Document;
  useDefaultTitle: boolean;
};

export type TMarkdownBlock = {
  title: string;
  body: string;
};

export type { Entry, EntryCollection } from 'contentful';
