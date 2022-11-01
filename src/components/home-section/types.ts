import type { BoxProps, GridProps } from "@chakra-ui/react";
import type { HomePageBlock } from "~/queries";

export interface HomeSectionProps extends BoxProps {
  block: HomePageBlock;
  index: number;
}

export type Sides = ["right", "left"];
type Side = ArrayElement<Sides>;

export interface HomeBlockProps extends Omit<GridProps, "title">, Omit<HomePageBlock, "body"> {
  side: Side;
  body: React.ReactNode;
}
