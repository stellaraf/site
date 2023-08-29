import NextLink from "next/link";
import { useRouter } from "next/router";

import { Link as ChakraLink, useToken } from "@chakra-ui/react";

import { Button } from "~/components";

import navConfig from "./config";

import type { DesktopNavLinkProps } from "./types";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import type { ButtonProps, LinkProps } from "~/components";

const NavLink = (props: DesktopNavLinkProps) => {
  const { isActive = false, ...rest } = props;
  const borderRadius = useToken("radii", "lg");

  const linkProps: ChakraLinkProps = {};
  if (isActive) {
    linkProps._after = {
      left: 0,
      right: 0,
      bottom: 0,
      width: "50%",
      height: "2px",
      content: `""`,
      marginLeft: "auto",
      marginRight: "auto",
      position: "absolute",
      borderRadius: "0.75rem",
      backgroundColor: "blackAlpha.300",
      transform: "translateY(-10px)",
      transition: "width: 0.5s, opacity: 0.5s, transform 0.5s",
    };
    linkProps._dark = { _after: { backgroundColor: "whiteAlpha.300" } };
  }
  return (
    <ChakraLink
      py={4}
      pos="relative"
      fontWeight="medium"
      px={{ lg: 2, xl: 3, "2xl": 6 }}
      mr={{ lg: 4, xl: 8 }}
      transition="all 0.2s"
      css={{ "&:focus": { borderRadius } }}
      _hover={{
        textDecoration: "none",
        transform: "translateY(-2px)",
        opacity: 0.8,
      }}
      href={props.href ?? "/"}
      as={NextLink}
      {...linkProps}
      {...rest}
    />
  );
};

/**
 * Group of header links, pinned to a specific side of the header.
 */
export const LinkGroup = (props: LinkProps) => {
  const { asPath } = useRouter();

  return (
    <>
      {navConfig.map(i => {
        /**
         * Determine which nav item is currently active, including child/sub pages. Because
         * the / route will match everything, filter that out from current path comparisons.
         */
        let isActive = false;
        if (asPath === "/" && i.link === "/") {
          isActive = true;
        } else if (i.link !== "/") {
          const match = asPath.match(new RegExp(i.link, "gi")) ?? [];
          isActive = match.length !== 0;
        }
        return (
          <NavLink key={i.link} href={i.link} isActive={isActive} {...props}>
            {i.title}
          </NavLink>
        );
      })}
    </>
  );
};

export const LoginButton = (props: ButtonProps) => (
  <Button
    color="secondary.600"
    _dark={{
      color: "white",
      borderColor: "white",
    }}
    target="_blank"
    borderWidth="1px"
    variant="outline"
    borderColor="secondary.500"
    href="https://launch.stellar.tech"
    _hover={{ backgroundColor: "secondary.50", _dark: { backgroundColor: "white" } }}
    {...props}
  >
    Log In
  </Button>
);
