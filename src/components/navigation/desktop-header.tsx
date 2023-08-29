import { useRouter } from "next/router";

import { chakra, Box, useColorMode } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";

import { Link } from "~/components";
import { useNavLogoState } from "~/hooks";

import { LinkGroup, LoginButton } from "./desktop-links";
import { HeaderLogo } from "./desktop-logo";

import type { BoxProps } from "@chakra-ui/react";

const Header = chakra("header", {
  baseStyle: {
    top: 0,
    left: 0,
    right: 0,
    height: 32,
    zIndex: 1000,
    width: "100%",
    position: "fixed",
    bg: "transparent",
    transition: { transition: "all 200ms ease-in" },
  },
});

const Navbar = chakra("nav", {
  baseStyle: {
    py: 8,
    flexDir: "row",
    position: "relative",
    alignItems: "center",
    px: { lg: 16, xl: 24 },
    justifyContent: "flex-start",
  },
});

const NavGroup = chakra("div", {
  baseStyle: {
    flex: "1 0 0 ",
    display: "flex",
    alignItems: "center",
    pointerEvents: "auto",
    justifyContent: "center",
  },
});

export const DHeader = (props: BoxProps) => {
  const { pathname } = useRouter();
  const showLogo = useNavLogoState();

  const { colorMode } = useColorMode();

  return (
    <Header
      bg="light.500"
      color="dark.500"
      _dark={{ bg: "transparent", color: "light.500", backdropFilter: "blur(10px)" }}
    >
      <Navbar {...props}>
        <Box overflow="hidden" pos="absolute">
          {pathname === "/" ? (
            <HeaderLogo show={showLogo} />
          ) : (
            <Link href="/" pb={4}>
              <StellarLogo colorMode={colorMode} width={160} height={56} />
            </Link>
          )}
        </Box>
        <NavGroup>
          <LinkGroup />
          <LoginButton />
        </NavGroup>
      </Navbar>
    </Header>
  );
};
