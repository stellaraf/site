import type { InputProps } from "@chakra-ui/react";
import type { FormState, ControllerFieldState, FieldValues } from "react-hook-form";

export interface SubscribeFieldProps
  extends Omit<InputProps, "name" | "title">,
    Pick<FormState<FieldValues>, "isSubmitSuccessful" | "isSubmitting">,
    Pick<ControllerFieldState, "error"> {
  name: string;
  title: string;
}
