import type { LinkProps as NextLinkProps } from "next/link";

import type { LinkProps as ChakraLinkProps, ChakraProps } from "@chakra-ui/react";

export interface LinkProps extends Omit<NextLinkProps & ChakraLinkProps, "href"> {
  href?: string;
  showIcon?: boolean;
  rightIcon?: JSX.Element;
  iconProps?: ChakraProps;
}
