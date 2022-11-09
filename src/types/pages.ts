import type { AppProps, AppInitialProps, AppContext } from "next/app";

import type { NextPageContext } from "next";
import type {
  Actions,
  Config,
  DocsGroups,
  FooterGroups,
  CloudLocations,
  Page,
  Employees,
  ContactForms,
  DocsPage,
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

export type PageProps = Page & WithError;

export type DocsPageProps = DocsPage & WithError;

export interface SiteProps {
  actions: Actions;
  config: Config;
  docsGroups: DocsGroups;
  footerGroups: FooterGroups;
  theme: ThemeConfig;
}

export interface CloudPageProps extends PageProps {
  locations: CloudLocations;
  // TODO: do something else with this BS
  geoData: Dict;
}

export interface ContactPageProps extends PageProps {
  contactForms: ContactForms;
}

export interface AboutPageProps extends PageProps {
  employees: Employees;
}
