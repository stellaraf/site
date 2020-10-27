import type { ReactNode } from 'react';
import type { CustomTheme, GlobalConfig, ThemeConfig } from 'site/types';

/**
 * Root Provider Props
 */
export interface IProvider {
  appConfig: GlobalConfig;
  children: ReactNode;
}

/**
 * Config Provider Types
 */
export interface IGlobalConfigCtx extends Omit<GlobalConfig, 'theme'> {}

export interface IConfigProvider {
  globalConfig: IGlobalConfigCtx;
  children?: ReactNode;
}

/**
 * UI Provider Types
 */
export type TUseTheme = () => CustomTheme;

export interface IUIProvider {
  theme: ThemeConfig;
  children?: ReactNode;
}

export interface ISyncedStyleProvider {
  children: ReactNode;
}
