import type { ReactNode } from 'react';
import type { IToast, UseToastOptions } from '@chakra-ui/react';

export type TToastPositions = UseToastOptions['position'];

export interface IUseAlert {
  message: ReactNode;
  status: IToast['status'];
  duration?: IToast['duration'];
  position?: TToastPositions;
  onClose?: IToast['onCloseComplete'];
}
