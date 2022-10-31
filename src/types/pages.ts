import type { AppProps, AppInitialProps, AppContext } from "next/app";

import type {
  Actions,
  Config,
  DocsGroups,
  FooterGroups,
  CloudLocations,
  Page as FixMePage,
  Employees,
  ContactForms,
} from "~/queries";
import type { ThemeConfig } from "~/types";

export type GetInitialPropsReturn<InitialProps> = AppProps &
  AppInitialProps & { appProps: InitialProps };

export type NextApp<P> = React.FC<GetInitialPropsReturn<P>> & {
  getInitialProps(ctx: AppContext): Promise<{ appProps: P }>;
};

export interface SiteProps {
  config: Config;
  docsGroups: DocsGroups;
  theme: ThemeConfig;
  footerGroups: FooterGroups;
  actions: Actions;
}

export interface CloudPageProps extends FixMePage {
  locations: CloudLocations;
  //TODO: do something else with this BS
  geoData: Dict;
}

export interface ContactPageProps extends FixMePage {
  contactForms: ContactForms;
}

export interface AboutPageProps extends FixMePage {
  employees: Employees;
}

export type PageProps = FixMePage;
