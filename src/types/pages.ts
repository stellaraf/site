import type { AppContext, AppInitialProps, AppProps } from "next/app";

import type { NextPageContext } from "next";
import type { FooterGroup, MenuProps } from "~/components";
import type { Holidays, LocationTime } from "~/lib/server";
import type {
  Actions,
  BlogPost,
  BlogPosts,
  CloudLocations,
  Config,
  ContactForms,
  DocsGroups,
  DocsPage,
  Employees,
  FooterGroups,
  HeaderGroups,
  HomePage,
  OfficeLocationWithTimezone,
  Page,
} from "~/queries";
import type { ThemeConfig } from "~/theme";

export type GetInitialPropsReturn<InitialProps> = AppProps &
  AppInitialProps & { appProps: InitialProps };

export type NextApp<P> = React.FC<GetInitialPropsReturn<P>> & {
  getInitialProps(ctx: AppContext): Promise<{ appProps: P }>;
};

export type PageWithInitialProps<
  InitialProps,
  Context extends AppContext | NextPageContext = NextPageContext,
> = React.FC<InitialProps> & {
  getInitialProps(ctx: Context): Promise<InitialProps>;
};

interface WithError {
  error?: string;
}

interface WithDraft {
  draft: boolean;
}

export type PageProps = Page & WithError & WithCommonPageProps & WithDraft;

export type DocsPageProps = DocsPage & WithError & WithCommonPageProps & WithDraft;

export type BlogPostProps = BlogPost & WithError & WithCommonPageProps & WithDraft;

export type HomePageProps = HomePage & WithError & WithCommonPageProps & WithDraft;

export interface SiteProps {
  actions: Actions;
  config: Config;
  docsGroups: DocsGroups;
  footerGroups: FooterGroups;
  headerGroups: HeaderGroups;
  theme: ThemeConfig;
}

interface WithCommonPageProps {
  common: CommonPageProps;
}

export interface BlogPageProps extends PageProps {
  blogPosts: BlogPosts;
}

export interface BlogTagPageProps extends BlogPageProps {
  tag: string;
}

export interface CommonPageProps {
  actions: Actions;
  config: Config;
  docsGroups: DocsGroups;
  footers: FooterGroup[][];
  menus: MenuProps[];
  theme: ThemeConfig;
  twitterHandle: string;
  origin: string;
}

export interface CloudPageProps extends PageProps {
  locations: CloudLocations;
  // TODO: do something else with this BS
  geoData: Dict;
}

export interface ContactPageProps extends PageProps {
  contactForms: ContactForms;
  holidays: Holidays;
  locationTimes: LocationTime[];
}

export interface AboutPageProps extends PageProps {
  employees: Employees;
  officeLocations: OfficeLocationWithTimezone[];
  holidays: Holidays;
}
