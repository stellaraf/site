import type { BoxProps, GridProps, HeadingProps } from "@chakra-ui/react";
import type { LabelProps } from "~/components";
import type { PageContent, Paragraph } from "~/types";

export interface ContentTitleProps extends HeadingProps {
  id: string;
  children: string;
}
export interface ContentSubtitleProps extends HeadingProps {
  children: string;
}

export interface ContentSubSectionProps extends Omit<Paragraph, "icon"> {
  icon?: string;
}

export interface SubSectionGroupProps extends GridProps {
  sections: PageContent["paragraphs"];
}

export interface ContentImageProps extends BoxProps {
  src: string;
}

export interface ContentFormProps {
  form: NonNullable<PageContent["form"]>;
}

export interface ContentUpdatedAtProps
  extends Omit<LabelProps, "left" | "right" | "leftColor" | "rightColor"> {
  children: React.ReactNode;
}

export interface ContentSectionProps extends BoxProps {
  items: PageContent;
  index: number;
}

export type ContentSides = ["right", "left"];
export type ContentSide = ArrayElement<ContentSides>;

export interface TitleLayoutProps {
  titleBlock: JSX.Element;
  image: JSX.Element | null;
  isMobile: boolean;
  side: ContentSide;
}
