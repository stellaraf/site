import type { Bio } from 'site/types';
import type { FlexProps, SimpleGridProps, UseDisclosureReturn } from '@chakra-ui/react';

export interface IPhoto extends FlexProps {
  index: number;
  onOpen: UseDisclosureReturn['onOpen'];
}

export interface IPhotoWrapper extends FlexProps {}

export interface IGroupWrapper extends SimpleGridProps {}

export interface IAvatars extends SimpleGridProps {
  bios: Bio[];
}

export interface IDetail {
  isOpen: UseDisclosureReturn['isOpen'];
  onClose: UseDisclosureReturn['onClose'];
}

export interface IHeader extends Omit<Bio, 'body'> {}

export interface IAvatarContext {
  bios: Bio[];
}
