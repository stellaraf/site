import { AlertProps } from "@chakra-ui/react";

export interface ErrorAlertProps extends AlertProps {
  title?: string;
  description?: React.ReactNode;
}
