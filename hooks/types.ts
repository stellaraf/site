import type { ReactNode } from 'react';
import type { IToast } from '@chakra-ui/core';

export interface IUseAlert {
  message: ReactNode;
  status: IToast['status'];
  duration?: IToast['duration'];
  position?: IToast['position'];
  onClose?: IToast['onCloseComplete'];
}
