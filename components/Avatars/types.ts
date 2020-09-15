import type { Bio } from 'site/util';
import type { BoxProps, FlexProps } from '@chakra-ui/core';

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

export interface WrapperProps extends FlexProps {}

export interface AvatarsProps extends BoxProps {
  bioList: Bio[];
}

export type { Bio } from 'site/util';
