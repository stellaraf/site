import type { BoxProps } from "@chakra-ui/react";
import type { RichTextValue } from "~/types";

export interface HeroProps extends BoxProps {
  title: string;
  subtitle?: string | null;
  body?: RichTextValue | null;
}
