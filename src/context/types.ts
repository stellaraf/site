import type { Config, DocsGroups } from "~/queries";
import type { CustomTheme, ThemeConfig } from "~/theme";

/**
 * Root Provider Props
 */
export interface ProviderProps {
  config: Config;
  theme: ThemeConfig;
  docsGroups: DocsGroups;
  children: React.ReactNode;
}

export interface ConfigContextType extends Config {
  docsGroups: DocsGroups;
}

export interface ConfigProviderProps {
  config: Config;
  docsGroups: DocsGroups;
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
  groups: DocsGroups;
}

export type ColorModeContext = {
  cookies: string;
};
