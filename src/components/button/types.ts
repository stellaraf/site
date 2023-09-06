import type {
  ButtonProps as ChakraButtonProps,
  LinkProps as ChakraLinkProps,
  IconProps,
} from "@chakra-ui/react";

export type ButtonLinkElement = HTMLButtonElement & HTMLAnchorElement;

type ButtonLinkProps = ChakraLinkProps & ChakraButtonProps;

export type ButtonProps = ButtonLinkProps & {
  href?: string;
  showIcon?: boolean;
  externalIconProps?: IconProps;
};
