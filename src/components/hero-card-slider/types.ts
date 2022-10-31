import type { FlexProps } from "@chakra-ui/react";
import type { RichTextContent } from "@graphcms/rich-text-types";

interface CardContent {
  title: string;
  body: RichTextContent;
}

export interface HeroCardProps extends FlexProps {
  content: CardContent;
}

export interface HeroCardSliderProps extends FlexProps {
  content: CardContent[];
  icon?: string;
}
