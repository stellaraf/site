import { Heading } from "@chakra-ui/react";

import { Link } from "~/components";
import { ArrowRightBold } from "~/icons";

import type { MobileNavLinkProps } from "./types";

export const NavLink = (props: MobileNavLinkProps) => {
  const { href, title, ...rest } = props;
  return (
    <Link
      as={Heading}
      fontSize="2xl"
      href={href}
      _hover={{ textDecoration: "unset" }}
      rightIcon={<ArrowRightBold ml={4} w={4} h={6} opacity={0.9} display="inline" />}
      {...rest}
    >
      {title}
    </Link>
  );
};
