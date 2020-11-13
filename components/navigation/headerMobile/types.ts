import type { FlexProps, UseDisclosureReturn } from '@chakra-ui/react';
import type { ILink } from 'site/components';

export interface IBaseHeader extends FlexProps {
  isOpen: UseDisclosureReturn['isOpen'];
  onToggle: UseDisclosureReturn['onToggle'];
  navHeaderHeight: number;
}

export interface INavLink extends ILink {
  title: string;
}

export interface IHeader extends FlexProps {}
