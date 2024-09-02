import type {
  ButtonProps,
  CheckboxGroupProps as ChakraCheckboxGroupProps,
  RadioGroupProps as ChakraRadioGroupProps,
  FlexProps,
  StackProps,
} from "@chakra-ui/react";
import type { ControllerProps, FieldValues } from "react-hook-form";
import type { SelectDynamicProps, SelectProps } from "~/components";
import type { PageContent } from "~/queries";
import type {
  AddressSearchField,
  CheckboxField,
  CurrencyField,
  DateField,
  FormGroup,
  RemoteSelectField,
  SelectField,
  SelectOptionSingle,
  TextAreaField,
  TextInputField,
} from "~/types";

type ControlProps<V extends FieldValues> = Required<
  Pick<ControllerProps<V>, "control" | "defaultValue" | "name">
> &
  Pick<ControllerProps<V>, "rules">;

export type FormFieldProps<Props, FormData extends Dict, F extends FormField> = Pick<
  ControlProps<FormData>,
  "name" | "rules" | "defaultValue"
> &
  Omit<Props, "as" | "onFocus" | "name" | "defaultValue" | "rules"> & {
    field: F;
  };

export type TextInputProps<Props, FormData extends Dict> = FormFieldProps<
  Props,
  FormData,
  TextInputField
>;

export type TextAreaProps<Props, FormData extends Dict> = FormFieldProps<
  Props,
  FormData,
  TextAreaField
>;

export type CheckboxProps<Props, FormData extends Dict> = FormFieldProps<
  Props,
  FormData,
  CheckboxField
>;

export type CurrencyFieldProps<Props, FormData extends Dict> = FormFieldProps<
  Props,
  FormData,
  CurrencyField
>;

export interface SelectFieldProps
  extends Omit<SelectProps<SelectOptionSingle>, "name" | "onSelect"> {
  name: string;
  field: SelectField;
}

export interface SelectDynamicFieldProps<Field extends FormField>
  extends Omit<SelectDynamicProps<SelectOptionSingle>, "name" | "onSelect" | "options"> {
  name: string;
  field: Field;
}

export interface RemoteSelectFieldProps
  extends Omit<SelectProps<SelectOptionSingle>, "name" | "onSelect" | "options"> {
  name: string;
  field: RemoteSelectField;
}

export type DateFieldProps<Props, FormData extends Dict> = Omit<
  FormFieldProps<Props, FormData, DateField>,
  "value" | "onSelectDate"
>;

export type FormField = Omit<
  | CheckboxField
  | SelectField
  | TextInputField
  | TextAreaField
  | CurrencyField
  | DateField
  | (FormGroup & { required?: boolean; fieldGroup?: number })
  | AddressSearchField
  | RemoteSelectField,
  "id" | "stage"
>;

export type FormValue<Field extends FormField> = Field extends CheckboxField
  ? string[]
  : Field extends SelectField
    ? string[]
    : Field extends DateField
      ? { start: string; end: string }
      : Field extends FormGroup
        ? never
        : Field["required"] extends true
          ? string
          : null;

export interface GenericFormProps<Fields extends FormField[]>
  extends Omit<FlexProps, "onSubmit" | "title">,
    Partial<Pick<NonNullable<PageContent["form"]>, "button" | "colorScheme">> {
  name: string;
  fields: Fields;
  buttonProps?: Partial<ButtonProps>;
  fieldGroupProps?: Partial<StackProps>;
  onSubmit?: () => void | Promise<void>;
  onSuccess?: (detail: Response) => void | Promise<void>;
  onFailure?: (detail: Error | Response) => void | Promise<void>;
}

export interface CheckboxGroupProps
  extends Omit<ChakraCheckboxGroupProps & ChakraRadioGroupProps, "children"> {
  isRequired?: boolean;
  opts: SelectOptionSingle[];
  isMulti?: boolean;
  label: string;
}
