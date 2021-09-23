import React from 'react';
import type { IDocsGroup, CustomTheme, ThemeConfig, GlobalConfig, TestimonialEntry } from '~/types';

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

type TGlobalConfig = Omit<GlobalConfig, 'theme'>;

export interface IConfigProvider extends Omit<IProvider, 'appConfig'> {
  globalConfig: TGlobalConfig;
}

export interface IGlobalConfigCtx extends TGlobalConfig {
  docsGroups: IDocsGroup[];
  testimonials: TestimonialEntry[];
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
