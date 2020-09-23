import type { ReactNode } from 'react';
import type { GlobalConfig, ThemeConfig } from './content';
import type { CustomTheme } from './theme';

/**
 * Root Provider Props
 */
export interface ProviderProps {
  appConfig: GlobalConfig;
  children: ReactNode;
}

/**
 * Config Provider Types
 */
export type GlobalConfigContext = Omit<GlobalConfig, 'theme'>;
export interface ConfigProviderProps {
  globalConfig: GlobalConfigContext;
  children?: ReactNode;
}

/**
 * UI Provider Types
 */
export type UseTheme = () => CustomTheme;

export interface UIProviderProps {
  theme: ThemeConfig;
  children?: ReactNode;
}

/**
 * Media Provider Types
 */
export interface UseMedia {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  mediaSize: string | null;
}

export interface MediaProviderProps {
  children: ReactNode;
}
