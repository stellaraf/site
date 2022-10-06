import type { FlexProps, UseDisclosureReturn } from "@chakra-ui/react";
import type { LinkProps } from "~/components";

export interface HeaderLogoProps {
  show: boolean;
}

export interface DesktopNavLinkProps extends LinkProps {
  isActive?: boolean;
}

export interface DesktopLinkGroupProps extends LinkProps {
  side: "left" | "right";
}

export interface MobileNavLinkProps extends LinkProps {
  title: string;
}

export interface BaseHeaderProps extends FlexProps {
  isOpen: UseDisclosureReturn["isOpen"];
  onToggle: UseDisclosureReturn["onToggle"];
  navHeaderHeight: number;
}
