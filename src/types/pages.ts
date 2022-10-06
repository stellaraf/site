import type { AppProps, AppInitialProps, AppContext } from "next/app";

import type { BoxProps } from "@chakra-ui/react";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";
import type {
  IMeasuredGeoPoint,
  HomeSection,
  HeroCard,
  TFormModelTrial,
  GlobalConfig,
  IContactCard,
  IDocsArticle,
  IDocsGroup,
  SortedFooterItem,
  PageAttrs,
  TActions,
  TestimonialEntry,
  PageContent,
  Entry,
  Bio,
} from "~/types";

export type GetInitialPropsReturn<InitialProps> = AppProps &
  AppInitialProps & { appProps: InitialProps };

export type NextApp<P> = React.FC<GetInitialPropsReturn<P>> & {
  getInitialProps(ctx: AppContext): Promise<{ appProps: P }>;
};

export type Page<P extends Dict = Dict> = {
  pageData: P;
  preview: boolean;
};

export type PageWithContent<P extends Dict = Dict> = Page<PageAttrs & P> & {
  pageContent: PageContent[];
};

export type PageEntry<P extends Page = Page> = Omit<P, "pageData"> & {
  pageData: Entry<P["pageData"]>;
};

export interface TSite {
  globalConfig: GlobalConfig;
  footerGroups: SortedFooterItem[];
  actions: TActions[];
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
}

/**
 * Home Page Types
 */
export interface THome {
  pageContent: THomePageContent;
}

export interface THomePageContent {
  sections: Entry<HomeSection>[];
  heroCards: Entry<HeroCard>[];
  mainVideo?: Asset;
}

/**
 * Cloud Page Types
 */
export interface ICloud extends PageWithContent {
  geoData: Dict;
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

export type IMapSection = ISection;

/**
 * Contact Page Types
 */

interface IContactCustomProperties {
  metaTitle: string;
}

export interface IContactPage
  extends PageWithContent<{ customProperties: IContactCustomProperties }> {
  contactCards: IContactCard[];
}

/**
 * About Page Types
 */
export interface IAboutPage
  extends PageWithContent<{
    customProperties: { employeesTitle: string; mapTitle: string };
  }> {
  bios: Bio[];
}

/**
 * Legal Page Types (Dynamic)
 */
export type ILegalPage = PageWithContent;

export interface IVendorPage {
  pageData: {
    name: string;
    logo: Asset["fields"];
    logoColorLightMode: string;
    logoColorDarkMode: string;
    title: string;
    subtitle: string;
    body?: Document;
    trialForm?: TFormModelTrial;
    partnerLogo?: Asset["fields"];
  };
}

/**
 * Cloud Product Pages
 */
interface IPartnerPageDataBase {
  name: string;
  logo: Asset;
  logoColorLightMode: string;
  logoColorDarkMode: string;
  title: string;
  subtitle: string;
  body?: Document;
  partnerLogo?: Asset;
}

/**
 * Partner Page Types
 */
interface IPartnerPageDataEntry extends IPartnerPageDataBase {
  trialForm?: Entry<TFormModelTrial>;
}

interface IPartnerPageData extends IPartnerPageDataBase {
  trialForm?: TFormModelTrial;
}

export interface IPartnerPageEntry {
  pageData: IPartnerPageDataEntry;
}

export interface IPartnerPage {
  pageData: IPartnerPageData;
}

/**
 * Docs Pages
 */
export interface IDocs {
  docsGroups: IDocsGroup[];
}

export type IDocsGroupMain = Page<IDocsGroup>;

export type IDocsMain = Page<PageAttrs>;

export interface IDocsArticlePage {
  article: IDocsArticle;
}
