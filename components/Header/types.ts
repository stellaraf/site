import type { LinkProps, SystemProps, SystemStyleObject } from '@chakra-ui/core';

export interface HeaderLogoProps {
  color?: string;
  show: boolean;
}

type NavLinkStyleAttrs = {
  activeColor?: string;
};

export type NavLinkStyles = NavLinkStyleAttrs & SystemStyleObject;

export interface NavLinkProps extends LinkProps {
  isActive?: boolean;
  styles: NavLinkStyles;
}

export interface LinkGroupProps extends LinkProps {
  side: 'left' | 'right';
  styles: NavLinkStyles;
}

export interface PassedLinkProps extends SystemProps {
  sx: SystemStyleObject;
}
