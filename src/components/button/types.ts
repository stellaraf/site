import type {
  ButtonProps as ChakraButtonProps,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export type ExternalButtonProps = ButtonProps &
  ChakraLinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonLinkElement = HTMLButtonElement & HTMLAnchorElement;

type ButtonLinkProps = ChakraLinkProps & ChakraButtonProps;

export interface ButtonProps extends ButtonLinkProps {
  href?: string;
}
