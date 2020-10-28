import type { FlexProps, UseDisclosureReturn } from '@chakra-ui/core';
import type { ReactNode } from 'react';
import type { ILink } from 'site/components';

export interface IBaseHeader extends FlexProps {
  isOpen: UseDisclosureReturn['isOpen'];
  onToggle: UseDisclosureReturn['onToggle'];
  burger: ReactNode;
  navHeaderHeight: number;
}

export interface INavLink extends ILink {
  title: string;
}

export interface IHeader extends FlexProps {}
