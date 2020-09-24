import type { BoxProps, FlexProps, StackProps, IconButtonProps, InputProps } from '@chakra-ui/core';
import type { FooterItem } from 'site/types';

export interface FooterProps extends BoxProps {
  groups: FooterItem[];
}

export interface IFooterLinks extends FlexProps {
  groups: FooterItem[];
}

export interface StructuredItems<T> {
  [k: string]: T;
}

export interface ISocialLinks extends StackProps {}

export interface ISocialLink extends Omit<IconButtonProps, 'href' | 'title' | 'aria-label'> {
  label: string;
  href: string;
}

export type { BoxProps } from '@chakra-ui/core';

export interface ISubscribe extends StackProps {}

export interface ISubscribeInput extends InputProps {}
