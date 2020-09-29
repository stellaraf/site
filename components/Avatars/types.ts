import type { Bio } from 'site/types';
import type { BoxProps, FlexProps, SimpleGridProps } from '@chakra-ui/core';

export interface IPhoto extends BoxProps {
  attrs: Bio;
  onClick: (e: any) => void;
}

export interface IPhotoWrapper extends FlexProps {}

export interface IGroupWrapper extends SimpleGridProps {}

type Handler = (n: number) => void;

export interface IAvatarGroup extends SimpleGridProps {
  group: Bio[];
  handlers: Handler[];
  isOpen: boolean;
  dividerColor: string;
  current: number;
}

export interface IAvatars extends SimpleGridProps {
  bios: Bio[];
}
