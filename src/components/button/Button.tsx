import NextLink from "next/link";
import { Button as ChakraButton } from "@chakra-ui/react";
import { useLinkType } from "~/hooks";
import { forwardRef } from "~/util";

import type { ButtonProps, ButtonLinkElement } from "./types";

const BaseButton = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => <ChakraButton as="a" ref={ref} px={3} py={1} lineHeight={1.5} borderRadius="lg" {...props} />);

const ExternalButton = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  const { href = "#", target, ...rest } = props;
  return <BaseButton ref={ref} href={href} target="_blank" rel="noopener noreferrer" as={NextLink} {...rest} />;
});

export const Button = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  /* eslint prefer-const: 0 */
  let { href = "#", ...rest } = props;
  if (typeof rest.children === "string") {
    rest = { ...rest, "aria-label": rest.children };
  }
  const { isExternal, target } = useLinkType(href);
  let Component = BaseButton;

  if (isExternal) {
    Component = ExternalButton;
  }
  return <Component href={target} ref={ref} {...rest} />;
});
