import type { BoxProps, GridProps, HeadingProps } from "@chakra-ui/react";
import type { LabelProps, CardProps } from "~/components";
import type { PageContent, Feature } from "~/queries";

export interface ContentTitleProps extends HeadingProps {
  id: string;
  children: string;
}
export interface ContentSubtitleProps extends HeadingProps {
  children: string;
}

export interface ContentFeatureProps extends Feature {}

export interface ContentFeatureGridProps extends GridProps {
  features: Feature[];
}

export interface ContentImageProps extends BoxProps {
  src: string;
}

export interface ContentFormProps extends CardProps {
  form: NonNullable<PageContent["form"]>;
}

export interface ContentUpdatedAtProps
  extends Omit<LabelProps, "left" | "right" | "leftColor" | "rightColor"> {
  time: string;
}

export interface ContentSectionProps extends BoxProps {
  content: PageContent;
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
