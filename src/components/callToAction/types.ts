import type { BoxProps } from "@chakra-ui/react";
import type { TActions } from "~/types";

export interface ICallToAction extends BoxProps {
  actions: TActions[];
}
export interface ICallToActionMemo extends ICallToAction {
  currentPath: string;
}
