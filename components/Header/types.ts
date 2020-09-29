import type {
  FlexProps,
  SystemProps,
  SystemStyleObject,
  UseDisclosureReturn,
} from '@chakra-ui/core';
import type { ReactNode } from 'react';
import type { LinkProps } from 'site/components';

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

export interface IMobileBaseHeader extends FlexProps {
  isOpen: UseDisclosureReturn['isOpen'];
  onToggle: UseDisclosureReturn['onToggle'];
  burger: ReactNode;
}

export type { BoxProps, FlexProps } from '@chakra-ui/core';

export interface IMobileNavLink extends LinkProps {
  title: string;
}
