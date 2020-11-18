import * as React from "react";
import NextLink from "next/link";
import { Button as ChakraButton } from "@chakra-ui/core";
import { useLinkType } from "../hooks";

export const Button = ({ href = "/", ...props }) => {
  const { isExternal, target } = useLinkType(href);
  const Wrapper = isExternal ? React.Fragment : NextLink;
  const wrapperProps = isExternal ? {} : { href: target, passHref: true };
  const buttonProps = isExternal ? { isExternal: true, href: target } : {};
  return (
    <Wrapper {...wrapperProps}>
      <ChakraButton
        as="a"
        px={3}
        py={1}
        lineHeight={1.5}
        borderRadius="lg"
        aria-label={props.children}
        {...buttonProps}
        {...props}
      />
    </Wrapper>
  );
};
