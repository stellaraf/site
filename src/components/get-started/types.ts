import type { BoxProps } from "@chakra-ui/react";
import type { IGetStartedEntry } from "~/types";

export interface GetStartedProps extends IGetStartedEntry, Omit<BoxProps, "title"> {}
