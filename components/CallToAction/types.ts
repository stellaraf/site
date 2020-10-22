import type { BoxProps } from '@chakra-ui/core';
import type { IActions } from 'site/types';

export interface ICallToAction extends BoxProps {
  actions: IActions[];
}
export type { IActions } from 'site/types';
