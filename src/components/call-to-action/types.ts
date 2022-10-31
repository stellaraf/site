import type { BoxProps } from "@chakra-ui/react";
import type { Actions } from "~/queries";

export interface CallToActionProps extends BoxProps {
  actions: Actions;
}
export interface MemoCallToActionProps extends CallToActionProps {
  currentPath: string;
}
