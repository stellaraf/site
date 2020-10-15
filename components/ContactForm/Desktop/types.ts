import type { MutableRefObject } from 'react';
import type { CustomColors } from 'site/types';
import type { FormHandlers } from '../Forms/types';

export interface IDesktopForm {
  title: string;
  body: string;
  icon: JSX.Element;
  accent: keyof CustomColors;
  toggleLayout: (i?: number) => void;
  formRef: MutableRefObject<FormHandlers>;
  onSubmit?: () => void;
}
