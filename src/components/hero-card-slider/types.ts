import type { FlexProps } from "@chakra-ui/react";
import type { RichTextValue } from "~/types";

interface CardContent {
  title: string;
  body: RichTextValue;
}

export interface HeroCardProps extends FlexProps {
  content: CardContent;
}

export interface HeroCardSliderProps extends FlexProps {
  content: CardContent[];
  icon?: string;
}
