import type { ReactNode } from "react";
import type { FlexProps } from "@chakra-ui/react";

export interface ILabel extends Omit<FlexProps, "left" | "right"> {
  left: ReactNode;
  right: ReactNode;
  leftColor: string;
  rightColor: string;
  rightProps?: FlexProps;
  leftProps?: FlexProps;
}
