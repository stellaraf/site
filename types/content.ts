import type { Entry, ContentTypeLink, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

interface ContentRef {
  sys: ContentTypeLink;
}

export interface FooterLink {
  title: string;
  href: string;
  parent?: string;
}

export interface FooterGroupEntry {
  title: string;
  sortWeight: number;
}

export interface FooterItem extends FooterLink {
  footerGroup: FooterGroupEntry;
}

export interface FooterGroup {
  title: string;
  items: FooterLink[];
}

export interface PageAttrs {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body?: Document;
  footerGroup?: ContentRef;
  footerTitle?: string;
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
}

export interface PageContent {
  page: ContentRef;
  sortWeight: number;
  title: string;
  subtitle?: string;
  body: Document | null;
  paragraphs: Paragraph[];
  button: boolean;
  buttonText?: string;
  buttonLink?: string;
  footerGroup?: ContentRef;
  footerTitle?: string;
}

export interface HomeSection {
  title: string;
  subtitle: string;
  body: Document | null;
  showButton: boolean;
  buttonText: string;
  buttonLink: string;
  sortWeight: number;
}

export interface HeroCard {
  title: string;
  body: Document | null;
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
}

export interface PageProps {
  pageData: PageAttrs;
  pageContent: PageContent[];
}

type Photo = Asset['fields']['file'];

interface BioContent {
  name: string;
  title: string;
  bio: Document;
  photo: Asset;
}

export interface Bio extends Omit<BioContent, 'photo'> {
  photo: Photo;
}

interface BioRaw {
  name: string;
  bios: Entry<BioContent>[];
}

export type BioEntry = Entry<BioRaw>;

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

interface ThemeEntry {
  themeName: string;
  colors: Colors;
  fonts: Fonts;
}

export interface GlobalConfigPre {
  siteTitle: string;
  siteDescription: string;
  siteSlogan: string;
  twitterHandle: string;
  orgName: string;
  titleOverrides: string[];
  bioList: Entry<BioContent>;
  theme: Entry<ThemeEntry>;
}

export interface ThemeConfig {
  colors: Omit<Colors, 'themeName'>;
  fonts: Omit<Fonts, 'themeName'>;
}

export interface GlobalConfig extends Omit<GlobalConfigPre, 'theme'> {
  bioListId: string;
  theme: ThemeConfig;
}

export type { Entry, EntryCollection } from 'contentful';
