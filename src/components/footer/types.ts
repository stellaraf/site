import type { BoxProps, IconButtonProps, SimpleGridProps } from "@chakra-ui/react";
import type { FooterGroups } from "~/queries";

export interface FooterProps extends BoxProps {
  groups: FooterGroups;
}

export interface FooterLinksProps extends SimpleGridProps {
  groups: FooterGroups;
}

export interface SocialLinkProps extends Omit<IconButtonProps, "href" | "title" | "aria-label"> {
  label: string;
  href: string;
}
