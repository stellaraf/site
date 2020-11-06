import type { LinkProps, SystemStyleObject } from '@chakra-ui/core';

import type { ILink } from 'site/components';

export interface HeaderLogoProps {
  color?: string;
  show: boolean;
}

type NavLinkStyleAttrs = {
  activeColor?: string;
};

export type NavLinkStyles = NavLinkStyleAttrs & SystemStyleObject;

export interface INavLink extends ILink {
  isActive?: boolean;
}

export interface ILinkGroup extends ILink {
  side: 'left' | 'right';
}

export interface IPassedLink extends LinkProps {}

export type { BoxProps, FlexProps } from '@chakra-ui/core';
