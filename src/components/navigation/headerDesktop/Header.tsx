import { useRouter } from "next/router";
import { chakra, Box } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";
import { Link } from "~/components";
import { useColorValue, useColorMode } from "~/context";
import { useNavLogoState } from "~/hooks";
import { LinkGroup, ContactButton } from "./Links";
import { HeaderLogo } from "./Logo";

import type { IDHeader } from "./types";

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

export const DHeader: React.FC<IDHeader> = (props: IDHeader) => {
  const { pathname } = useRouter();
  const showLogo = useNavLogoState();

  const { colorMode } = useColorMode();
  const bg = useColorValue("light.500", "transparent");
  const color = useColorValue("dark.500", "light.500");
  const cssProps = useColorValue({}, { css: { backdropFilter: "blur(10px)" } });

  return (
    <Header bg={bg} color={color} {...cssProps}>
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
          <LinkGroup side="left" />
          <LinkGroup side="right" />
          <ContactButton />
        </NavGroup>
      </Navbar>
    </Header>
  );
};
