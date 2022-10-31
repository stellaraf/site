import type { BoxProps } from "@chakra-ui/react";
import type { Callout } from "~/queries";

export type CalloutProps = Callout & Omit<BoxProps, "title">;
