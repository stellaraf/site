import type { LinkProps as NextLinkProps } from "next/link";
import type { BoxProps, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

export interface ILink extends Omit<NextLinkProps & ChakraLinkProps, "href"> {
  href?: string;
  showIcon?: boolean;
}

export type ILinkIcon = BoxProps;
