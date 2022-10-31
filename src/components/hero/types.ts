import type { BoxProps } from "@chakra-ui/react";
import type { RichTextContent } from "@graphcms/rich-text-types";

export interface HeroProps extends BoxProps {
  title: string;
  subtitle?: string | null;
  body?: RichTextContent | null;
}
