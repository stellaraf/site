import type { FormHandlers, FormType } from "./forms/types";
import type { BoxProps, FlexProps, StackProps } from "@chakra-ui/react";
import type { ParsedUrlQuery } from "querystring";
import type { IContactCard, CustomColors, FormModel } from "~/types";

type FormCardContentPropsBase = IContactCard & FlexProps;

export type FormIcon = IContactCard["icon"];

export interface FormCardContentProps
  extends Omit<FormCardContentPropsBase, "icon" | "color" | "buttonText"> {
  icon: JSX.Element;
  iconName: FormIcon;
  index?: number;
  accent?: keyof CustomColors;
  formRef?: React.MutableRefObject<FormHandlers>;
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
  cards: IContactCard[];
}

export type TSupportedFormQuery = {
  form: FormType;
};

export type TContactQuery = TSupportedFormQuery | ParsedUrlQuery;

export type AvailableForms = {
  Support: FormModel<"Support">;
  Sales: FormModel<"Sales">;
};
