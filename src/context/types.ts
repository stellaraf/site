import type { CustomTheme, GlobalConfig, ThemeConfig, IDocsGroup, TestimonialEntry } from "~/types";

/**
 * Root Provider Props
 */
export interface ProviderProps {
  appConfig: GlobalConfig;
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
  children: React.ReactNode;
}

/**
 * Config Provider Types
 */

type TGlobalConfig = Omit<GlobalConfig, "theme">;

export interface ConfigContextType extends TGlobalConfig {
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
}

export interface ConfigProviderProps {
  globalConfig: TGlobalConfig;
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
  children?: React.ReactNode;
}

/**
 * UI Provider Types
 */
export type UseTheme = () => CustomTheme;

export interface UIProviderProps {
  theme: ThemeConfig;
  children?: React.ReactNode;
  cookies?: string;
}

/**
 * Docs Layout Provider
 */
export interface DocsContextType {
  groups: IDocsGroup[];
}

export type ColorModeContext = {
  cookies: string;
};
