import type { ReactNode } from 'react';
import type { Bio } from 'site/types';
import type { BoxProps, FlexProps, SimpleGridProps, UseDisclosureReturn } from '@chakra-ui/core';

export interface IPhoto extends BoxProps {
  attrs: Bio;
  onClick: (e: any) => void;
}

export interface IPhotoWrapper extends FlexProps {}

export interface IGroupWrapper extends SimpleGridProps {}

export interface IAvatars extends SimpleGridProps {
  bios: Bio[];
}

export interface IDetail extends UseDisclosureReturn {
  name: Bio['name'];
  title: Bio['title'];
  photo?: Bio['photo'];
  body: ReactNode;
}
