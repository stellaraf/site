import type { CustomTheme, GlobalConfig, ThemeConfig, IDocsGroup, TestimonialEntry } from "~/types";

/**
 * Root Provider Props
 */
export interface IProvider {
  appConfig: GlobalConfig;
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
  children: React.ReactNode;
}

/**
 * Config Provider Types
 */

type TGlobalConfig = Omit<GlobalConfig, "theme">;

export interface IGlobalConfigCtx extends TGlobalConfig {
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
}

export interface IConfigProvider {
  globalConfig: TGlobalConfig;
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
  children?: React.ReactNode;
}

/**
 * UI Provider Types
 */
export type TUseTheme = () => CustomTheme;

export interface IUIProvider {
  theme: ThemeConfig;
  children?: React.ReactNode;
  cookies?: string;
}

export interface ISyncedStyleProvider {
  children: React.ReactNode;
}

/**
 * Docs Layout Provider
 */
export interface IDocsCtx {
  groups: IDocsGroup[];
}

export type TColorModeCtx = {
  cookies: string;
};
