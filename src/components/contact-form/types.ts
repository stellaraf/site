import type { BoxProps, FlexProps, StackProps } from "@chakra-ui/react";
import type { GenericForm } from "~/components";
import type { ContactForms, ContactForm, ContactFormFields } from "~/queries";
import type { CustomColors } from "~/theme";

export interface FormCardContentProps extends Omit<ContactForm & FlexProps, "icon" | "color"> {
  icon: JSX.Element;
  index?: number;
  accent?: keyof CustomColors;
  formRef?: React.MutableRefObject<{ submit: () => void }>;
  toggleLayout?: (i?: number) => void;
}

export interface FormCardBodyProps extends BoxProps {
  spacing?: StackProps["spacing"];
}

export interface MotionItems {
  idx: number;
  current: number | null;
}

export interface FormCardGroupProps extends StackProps {
  contactForms: ContactForms;
}

type NotFormButton<
  T extends ArrayElement<ContactFormFields>,
  U = { [K in keyof T]: Pick<T, K> },
> = T["__typename"] extends "FormButton" ? never : Partial<T> & U[keyof U];

type ExcludeFormButton<Union extends ArrayElement<ContactFormFields>> =
  Union extends NotFormButton<Union> ? Union : never;

type ContactFormFieldsWithoutFormButton = ExcludeFormButton<ArrayElement<ContactFormFields>>;

type RequiredFormButton = React.ComponentProps<typeof GenericForm>["button"];

export interface FormElements {
  button: RequiredFormButton | null;
  fields: ContactFormFieldsWithoutFormButton[];
}
