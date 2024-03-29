import type { TableCellProps } from "@chakra-ui/react";
import type { ButtonProps } from "~/components";
import type { ContentButton } from "~/types";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type Headings = `h${HeadingLevel}`;

export interface TdProps extends TableCellProps {
  isHeader?: boolean;
}

export type ContentButtonProps = Pick<
  ContentButton,
  "__typename" | "colorScheme" | "variant" | "showIcon" | "text" | "link"
> &
  ButtonProps;
