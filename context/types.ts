import type { ReactNode } from 'react';
import type { CustomTheme, GlobalConfig, ThemeConfig, IDocsGroup } from 'site/types';

/**
 * Root Provider Props
 */
export interface IProvider {
  appConfig: GlobalConfig;
  docsGroups: IDocsGroup[];
  children: ReactNode;
}

/**
 * Config Provider Types
 */

type TGlobalConfig = Omit<GlobalConfig, 'theme'>;

export interface IGlobalConfigCtx extends TGlobalConfig {
  docsGroups: IDocsGroup[];
}

export interface IConfigProvider {
  globalConfig: TGlobalConfig;
  docsGroups: IDocsGroup[];
  children?: ReactNode;
}

/**
 * UI Provider Types
 */
export type TUseTheme = () => CustomTheme;

export interface IUIProvider {
  theme: ThemeConfig;
  children?: ReactNode;
  cookies?: string;
}

export interface ISyncedStyleProvider {
  children: ReactNode;
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
