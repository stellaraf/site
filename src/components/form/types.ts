import type {
  FlexProps,
  CheckboxGroupProps as ChakraCheckboxGroupProps,
  RadioGroupProps as ChakraRadioGroupProps,
  ButtonProps,
  StackProps,
} from "@chakra-ui/react";
import type { FieldValues, ControllerProps } from "react-hook-form";
import type { SelectProps } from "~/components";
import type { PageContent } from "~/queries";
import type {
  SelectOptionSingle,
  CheckboxField,
  SelectField,
  TextInputField,
  TextAreaField,
} from "~/types";

interface BaseFormProps
  extends Partial<Pick<NonNullable<PageContent["form"]>, "button" | "colorScheme">> {
  onSubmit?: () => void | Promise<void>;
}

type ControlProps<V extends FieldValues> = Required<
  Pick<ControllerProps<V>, "control" | "defaultValue" | "name">
> &
  Pick<ControllerProps<V>, "rules">;

export type FormFieldProps<Props, FormData extends Dict> = Pick<
  ControlProps<FormData>,
  "name" | "rules" | "defaultValue"
> &
  Omit<Props, "as" | "onFocus" | "name" | "defaultValue" | "rules"> & {
    field: FormField;
  };

export interface SelectFieldProps
  extends Omit<SelectProps<SelectOptionSingle>, "name" | "onSelect" | "options"> {
  name: string;
  opts: SelectOptionSingle[];
  field: FormField;
}

export type FormField = Omit<
  CheckboxField | SelectField | TextInputField | TextAreaField,
  "id" | "stage"
>;

export type FormValue<Field extends FormField> = Field extends CheckboxField
  ? string[]
  : Field extends SelectField
  ? string[]
  : Field["required"] extends true
  ? string
  : null;

export interface GenericFormProps<Fields extends FormField[]>
  extends Omit<FlexProps, "onSubmit">,
    BaseFormProps {
  fields: Fields;
  buttonProps?: Partial<ButtonProps>;
  fieldGroupProps?: Partial<StackProps>;
}

export interface CheckboxGroupProps
  extends Omit<ChakraCheckboxGroupProps & ChakraRadioGroupProps, "children"> {
  isRequired?: boolean;
  opts: SelectOptionSingle[];
  isMulti?: boolean;
  label: string;
}
