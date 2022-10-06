import type { FlexProps } from "@chakra-ui/react";

export interface LabelProps extends Omit<FlexProps, "left" | "right"> {
  left: React.ReactNode;
  right: React.ReactNode;
  leftColor: string;
  rightColor: string;
  rightProps?: FlexProps;
  leftProps?: FlexProps;
}
