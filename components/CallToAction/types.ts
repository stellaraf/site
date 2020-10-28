import type { BoxProps } from '@chakra-ui/core';
import type { IActions } from 'site/types';

export interface ICallToAction extends BoxProps {
  actions: IActions[];
}
export interface ICallToActionMemo extends ICallToAction {
  currentPath: string;
}

export type { IActions } from 'site/types';
