import type { InputProps } from "@chakra-ui/react";
import type { ControllerFieldState, FieldValues, FormState } from "react-hook-form";

export interface SubscribeFieldProps
  extends Omit<InputProps, "name" | "title">,
    Pick<FormState<FieldValues>, "isSubmitSuccessful" | "isSubmitting">,
    Pick<ControllerFieldState, "error"> {
  name: string;
  title: string;
}
