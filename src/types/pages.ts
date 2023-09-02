import type { AppProps, AppInitialProps, AppContext } from "next/app";

import type { NextPageContext } from "next";
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

export type PageProps = Page & WithError & WithCommonPageProps;

export type DocsPageProps = DocsPage & WithError & WithCommonPageProps;

export type BlogPostProps = BlogPost & WithError & WithCommonPageProps;

export type HomePageProps = HomePage & WithError & WithCommonPageProps;

export interface SiteProps {
  actions: Actions;
  config: Config;
  docsGroups: DocsGroups;
  footerGroups: FooterGroups;
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
  footerGroups: FooterGroups;
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
