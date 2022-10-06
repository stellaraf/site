import type { BoxProps } from "@chakra-ui/react";
import type { TActions } from "~/types";

export interface CallToActionProps extends BoxProps {
  actions: TActions[];
}
export interface MemoCallToActionProps extends CallToActionProps {
  currentPath: string;
}
