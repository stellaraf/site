import type { Control, UseControllerProps, ControllerRenderProps, ControllerFieldState, UseFormStateReturn, FieldValues, Path } from "react-hook-form";
import type { SelectProps } from "~/components";
import type { TFormModelTrial, IFormDataTrial, TFormResponse, SelectOptionSingle } from "~/types";

export type TTextField<V extends FieldValues> = {
  field: ControllerRenderProps<V>;
  formState: UseFormStateReturn<V>;
  fieldState: ControllerFieldState;
  isRequired: boolean;
};

export type TFormField<Props, FormData extends Dict> = {
  ctl: Control<FormData>;
  id: Path<FormData>;
  defaultValue?: UseControllerProps<FormData>["defaultValue"];
} & Omit<Props, "as" | "onFocus" | "name">;

export interface ISelectField extends Omit<SelectProps<SelectOptionSingle>, "name" | "onSelect" | "options"> {
  id: string;
  opts: SelectOptionSingle[];
}

export interface IFormHandlers {
  submit: () => void;
}

export interface TTrialForm {
  name: string;
  fields: Omit<TFormModelTrial, "name">;
  onSubmit: (data: IFormDataTrial) => Promise<TFormResponse>;
}
