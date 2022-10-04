import type { BoxProps, LinkProps, SystemStyleObject } from "@chakra-ui/react";

import type { ILink } from "~/components";

export interface HeaderLogoProps {
  show: boolean;
}

type NavLinkStyleAttrs = {
  activeColor?: string;
};

export type NavLinkStyles = NavLinkStyleAttrs & SystemStyleObject;

export interface INavLink extends ILink {
  isActive?: boolean;
}

export interface ILinkGroup extends ILink {
  side: "left" | "right";
}

export interface IPassedLink extends LinkProps {}

export interface IDHeader extends BoxProps {}
