import type { SystemProps, SystemStyleObject } from '@chakra-ui/core';

import type { LinkProps } from 'site/components';

export interface HeaderLogoProps {
  color?: string;
  show: boolean;
}

type NavLinkStyleAttrs = {
  activeColor?: string;
};

export type NavLinkStyles = NavLinkStyleAttrs & SystemStyleObject;

export interface INavLink extends LinkProps {
  isActive?: boolean;
  styles: NavLinkStyles;
}

export interface ILinkGroup extends LinkProps {
  side: 'left' | 'right';
  styles: NavLinkStyles;
}

export interface IPassedLink extends SystemProps {
  sx: SystemStyleObject;
}

export type { BoxProps, FlexProps } from '@chakra-ui/core';
