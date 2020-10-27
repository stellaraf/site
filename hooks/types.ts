import type { IToast } from '@chakra-ui/core';

export interface IUseAlert {
  message: string;
  status: IToast['status'];
  duration?: IToast['duration'];
  position?: IToast['position'];
  onClose?: IToast['onCloseComplete'];
}
