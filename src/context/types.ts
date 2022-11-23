import type { Config, DocsGroups } from "~/queries";
import type { CustomTheme, ThemeConfig } from "~/theme";

/**
 * Root Provider Props
 */
export interface ProviderProps extends UIProviderProps {
  config: Config;
  docsGroups: DocsGroups;
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
  children: React.ReactNode;
  cookies?: string;
}

export type ColorModeContext = {
  cookies: string;
};
