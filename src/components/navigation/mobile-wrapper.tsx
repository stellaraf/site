import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";

import { Link } from "~/components";
import { useNavLogoState } from "~/hooks";

import type { BaseHeaderProps } from "./types";

export const Wrapper = (props: BaseHeaderProps) => {
  const { isOpen, onToggle, navHeaderHeight, children, ...rest } = props;
  const { colorMode } = useColorMode();
  const { pathname } = useRouter();
  const homePageLogo = useNavLogoState();

  // Show logo in the navbar only if:
  //   a) the homepage hero logo is hidden
  //   b) or on any other page
  //   c) and if the mobile nav is NOT open
  const [showLogo, setShowLogo] = useState(false);

  // Homepage cases
  if (pathname === "/") {
    // Mobile nav closed, hero logo shown, header logo not already shown: SHOW
    !isOpen && homePageLogo && !showLogo && setShowLogo(true);

    // Mobile nav closed, hero logo hidden, header logo already shown: HIDE
    !isOpen && !homePageLogo && showLogo && setShowLogo(false);

    // Homepage: mobile nav open, header logo shown: HIDE
    isOpen && showLogo && setShowLogo(false);
  }
  // Non-homepage cases
  else if (pathname !== "/") {
    // Non-homepage: mobile nav closed, not already shown, then SHOW
    !isOpen && !showLogo && setShowLogo(true);

    // Non-homepage: mobile nav open, already shown, then HIDE
    isOpen && showLogo && setShowLogo(false);
  }

  useEffect(() => () => setShowLogo(false), []);

  return (
    <Box
      h={20}
      top={0}
      left={0}
      w="100%"
      right={0}
      as="header"
      pos="fixed"
      zIndex={1000}
      bg="light.500"
      _dark={{ bg: "transparent" }}
      css={{ backdropFilter: "blur(10px)" }}
      transition={{ transition: "all 200ms ease-in" }}
    >
      <Flex
        px={8}
        h="100%"
        as="nav"
        flexDir="row"
        pos="relative"
        flexWrap="nowrap"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        justifyContent="space-between"
        borderBottomColor="blackAlpha.300"
        _dark={{ borderBottomColor: "whiteAlpha.300" }}
        {...rest}
      >
        <>
          <Link href="/" opacity={showLogo ? 1 : 0} mb={2}>
            <StellarLogo colorMode={colorMode} width="auto" height={navHeaderHeight} />
          </Link>
          {!isOpen && children}
        </>
      </Flex>
    </Box>
  );
};
