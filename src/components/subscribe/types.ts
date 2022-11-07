import type { InputProps } from "@chakra-ui/react";
import type { ControllerRenderProps } from "react-hook-form";

export interface SubscribeFieldProps extends InputProps {
  field: ControllerRenderProps<SubscribeFormData>;
}

export interface SubscribeFormData {
  email: string;
}
