import type { Bio } from 'site/types';
import type { BoxProps, FlexProps, SimpleGridProps } from '@chakra-ui/core';

/**
 * Array of n bios, grouped for layout reasons.
 */
export type BioGroup = Bio[][];

export interface PhotoGroupProps extends BoxProps {
  group: Bio[];
}

export interface PhotoProps extends BoxProps {
  attrs: Bio;
  onClick: (e: any) => void;
}

export interface IPhotoWrapper extends FlexProps {}

export interface IGroupWrapper extends SimpleGridProps {}

type Handler = (n: number) => void;

export interface IPhotoGroup extends SimpleGridProps {
  group: Bio[];
  handlers: Handler[];
  isOpen: boolean;
  dividerColor: string;
  current: number;
}

export interface AvatarsProps extends BoxProps {
  bioList: Bio[];
}

export type { Bio } from 'site/types';
