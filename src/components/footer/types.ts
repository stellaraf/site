import type { BoxProps, IconButtonProps, SimpleGridProps } from "@chakra-ui/react";
import type { SortedFooterItem } from "~/types";

export interface FooterProps extends BoxProps {
  groups: SortedFooterItem[];
}

export interface FooterLinksProps extends SimpleGridProps {
  groups: SortedFooterItem[];
}

export interface SocialLinkProps extends Omit<IconButtonProps, "href" | "title" | "aria-label"> {
  label: string;
  href: string;
}
