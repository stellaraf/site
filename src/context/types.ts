import type { Config, DocsGroups } from "~/queries";
import type { CustomTheme, ThemeConfig, Fonts } from "~/theme";

/**
 * Root Provider Props
 */
export interface ProviderProps extends UIProviderProps {
  config: Config;
  docsGroups: DocsGroups;
  draft: boolean;
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
  fonts: Fonts;
  children: React.ReactNode;
  cookies?: string;
}

export type ColorModeContext = {
  cookies: string;
};
