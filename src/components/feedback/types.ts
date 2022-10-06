import { AlertProps } from "@chakra-ui/react";

export interface ErrorProps extends AlertProps {
  title?: string;
  description?: React.ReactNode;
}
