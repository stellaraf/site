import type { FlexProps } from "@chakra-ui/react";
import type { Document } from "@contentful/rich-text-types";

interface CardContent {
  title: string;
  body: Document;
}

export interface HeroCardProps extends FlexProps {
  content: CardContent;
}

export interface HeroCardSliderProps extends FlexProps {
  content: CardContent[];
  icon?: string;
}
