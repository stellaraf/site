import type {
  Control,
  UseControllerProps,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  FieldValues,
  Path,
} from 'react-hook-form';
import type { ISelect, TOptions } from '~/components';
import type { TFormModelTrial, IFormDataTrial, TFormResponse } from '~/types';

export type TTextField<V extends FieldValues> = {
  field: ControllerRenderProps<V>;
  formState: UseFormStateReturn<V>;
  fieldState: ControllerFieldState;
  isRequired: boolean;
};

export type TFormField<Props, FormData> = {
  ctl: Control<FormData>;
  id: Path<FormData>;
  defaultValue?: UseControllerProps<FormData>['defaultValue'];
} & Omit<Props, 'as' | 'onFocus' | 'name'>;

export interface ISelectField extends Omit<ISelect, 'name' | 'onSelect' | 'options'> {
  id: string;
  opts: TOptions;
}

export interface IFormHandlers {
  submit: () => void;
}

export interface TTrialForm {
  name: string;
  fields: Omit<TFormModelTrial, 'name'>;
  onSubmit: (data: IFormDataTrial) => Promise<TFormResponse>;
}
