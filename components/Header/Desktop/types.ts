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
}

export interface ILinkGroup extends LinkProps {
  side: 'left' | 'right';
}

export interface IPassedLink extends SystemProps {}

export type { BoxProps, FlexProps } from '@chakra-ui/core';
