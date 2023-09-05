import type { AccordionProps, BoxProps, IconButtonProps, SimpleGridProps } from "@chakra-ui/react";

export interface FooterProps extends BoxProps {
  groups: FooterGroup[][];
}

export interface FooterLinksProps extends SimpleGridProps {
  groups: FooterGroup[][];
}

export interface MobileFooterLinksProps extends AccordionProps {
  groups: FooterGroup[][];
}

export interface SocialLinkProps extends Omit<IconButtonProps, "href" | "title" | "aria-label"> {
  label: string;
  href: string;
}

export interface FooterGroupItem {
  slug: string;
  title: string;
  footerTitle?: string | null | undefined;
  external?: boolean;
  showIcon?: boolean;
  [k: string]: unknown;
}

export interface FooterGroup {
  group: string;
  row: number;
  items: FooterGroupItem[];
  sortAlphabetically: boolean;
}
