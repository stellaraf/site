import type { BoxProps, GridProps } from "@chakra-ui/react";
import type { HomeSection } from "~/types";

export interface HomeSectionProps extends BoxProps {
  section: HomeSection;
  index: number;
}

export type Sides = ["right", "left"];
export type Side = ArrayElement<Sides>;

export interface HomeBlockProps
  extends Omit<GridProps, "title">,
    Pick<HomeSection, "buttonLink" | "buttonText" | "title" | "subtitle"> {
  body: React.ReactNode;
  side: Side;
  imageUrl: string;
}
