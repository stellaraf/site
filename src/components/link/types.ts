import type { LinkProps as NextLinkProps } from "next/link";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";

export interface LinkProps extends Omit<NextLinkProps & ChakraLinkProps, "href"> {
  href?: string;
  showIcon?: boolean;
}
