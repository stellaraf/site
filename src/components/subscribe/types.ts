import type { ToastProps, StackProps, InputProps, AlertProps } from "@chakra-ui/react";

import type { ControllerRenderProps } from "react-hook-form";

export interface SubscribeProps extends StackProps {
  alertProps?: AlertProps;
  alertPosition?: ToastProps["position"];
}

export interface SubscribeFieldProps extends InputProps {
  field: ControllerRenderProps<SubscribeFormData>;
}

export interface SubscribeFormData {
  email: string;
}

export interface SubscribeToast {
  status: ToastProps["status"];
  message: string;
}
