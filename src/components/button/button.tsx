import { forwardRef } from "react";

import NextLink from "next/link";

import { Button as ChakraButton } from "@chakra-ui/react";

import { useLinkType } from "~/hooks";
import { ExternalLink } from "~/icons";

import type { ButtonLinkElement, ButtonProps } from "./types";

const BaseButton = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  const { showIcon, externalIconProps, isExternal, ...rest } = props;
  return (
    <ChakraButton as="a" ref={ref} px={3} py={1} lineHeight={1.5} borderRadius="lg" {...rest} />
  );
});

const ExternalButton = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  const { href = "#", target, showIcon, externalIconProps = {}, ...rest } = props;
  return (
    <BaseButton
      ref={ref}
      href={href}
      as={NextLink}
      target="_blank"
      rel="noopener noreferrer"
      rightIcon={showIcon ? <ExternalLink {...externalIconProps} /> : undefined}
      {...rest}
    />
  );
});

export const Button = forwardRef<ButtonLinkElement, ButtonProps>((props, ref) => {
  /* eslint prefer-const: 0 */
  let { href = "#", showIcon = false, externalIconProps, ...rest } = props;
  if (typeof rest.children === "string") {
    rest = { ...rest, "aria-label": rest.children };
  }
  const { isExternal, target } = useLinkType(href);
  let Component = BaseButton;

  if (isExternal) {
    Component = ExternalButton;
  }
  return (
    <Component
      ref={ref}
      href={target}
      showIcon={showIcon}
      externalIconProps={externalIconProps}
      {...rest}
    />
  );
});

BaseButton.displayName = "BaseButton";
ExternalButton.displayName = "ExternalButton";
Button.displayName = "Buttom";
