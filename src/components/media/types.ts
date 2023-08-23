import type { BoxProps } from "@chakra-ui/react";

export interface BackdropProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
}
