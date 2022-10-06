import NextLink from "next/link";
import { useRouter } from "next/router";

import { Link as ChakraLink, useToken } from "@chakra-ui/react";

import { Button } from "~/components";
import { useColorValue } from "~/context";

import navConfig from "./config";

import type { DesktopNavLinkProps, DesktopLinkGroupProps } from "./types";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import type { ButtonProps } from "~/components";

const NavLink = (props: DesktopNavLinkProps) => {
  const { isActive = false, ...rest } = props;
  const activeColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const borderRadius = useToken("radii", "lg");

  const linkProps = {} as ChakraLinkProps;
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
      backgroundColor: activeColor,
      transform: "translateY(-10px)",
      transition: "width: 0.5s, opacity: 0.5s, transform 0.5s",
    };
  }
  return (
    <ChakraLink
      py={4}
      pos="relative"
      fontWeight="medium"
      px={{ lg: 2, xl: 4 }}
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
export const LinkGroup = (props: DesktopLinkGroupProps) => {
  const { side, ...rest } = props;
  const { asPath } = useRouter();

  return (
    <>
      {navConfig[side].map(i => {
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
          <NavLink key={i.link} href={i.link} isActive={isActive} {...rest}>
            {i.title}
          </NavLink>
        );
      })}
    </>
  );
};

export const ContactButton = (props: ButtonProps) => {
  const color = useColorValue("secondary.600", "white");
  const hoverBg = useColorValue("secondary.50", "whiteAlpha.100");
  const borderColor = useColorValue("secondary.500", "white");
  return (
    <Button
      color={color}
      href="/contact"
      borderWidth="1px"
      variant="outline"
      borderColor={borderColor}
      _hover={{ backgroundColor: hoverBg }}
      {...props}
    >
      Talk to Us
    </Button>
  );
};
