import type {
  Path,
  Control,
  FieldValues,
  UseControllerProps,
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import type { SelectProps } from "~/components";
import type { SelectOptionSingle } from "~/types";

export interface TextFieldProps<V extends FieldValues> {
  field: ControllerRenderProps<V>;
  formState: UseFormStateReturn<V>;
  fieldState: ControllerFieldState;
  isRequired: boolean;
}

export type FormFieldProps<Props, FormData extends Dict> = {
  ctl: Control<FormData>;
  id: Path<FormData>;
  defaultValue?: UseControllerProps<FormData>["defaultValue"];
} & Omit<Props, "as" | "onFocus" | "name">;

export interface SelectFieldProps
  extends Omit<SelectProps<SelectOptionSingle>, "name" | "onSelect" | "options"> {
  id: string;
  opts: SelectOptionSingle[];
}
