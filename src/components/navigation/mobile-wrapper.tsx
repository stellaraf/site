import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { StellarLogo } from "@stellaraf/logo";
import { Link } from "~/components";
import { useColorMode, useColorValue } from "~/context";
import { useNavLogoState } from "~/hooks";

import type { BaseHeaderProps } from "./types";

export const Wrapper = (props: BaseHeaderProps) => {
  const { isOpen, onToggle, navHeaderHeight, children, ...rest } = props;
  const bg = useColorValue("light.500", "transparent");
  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const { colorMode } = useColorMode();
  const { pathname } = useRouter();
  const globalShowLogo = useNavLogoState();

  /**
   * Show logo in the navbar only if:
   *   a) the homepage hero logo is hidden
   *   b) or on any other page
   *   c) and if the mobile nav is NOT open
   */
  const [showLogo, setShowLogo] = useState(false);

  if (pathname === "/") {
    // Homepage: mobile nav closed, hero hidden, not already shown, then SHOW
    !isOpen && globalShowLogo && !showLogo && setShowLogo(true);
    // Homepage: mobile nav closed, hero shown, already shown, then HIDE
    !isOpen && !globalShowLogo && showLogo && setShowLogo(false);
    // Homepage: mobile nav open, hero shown, already shown, then HIDE
    isOpen && showLogo && setShowLogo(false);
  } else if (pathname !== "/") {
    // Non-homepage: mobile nav closed, not already shown, then SHOW
    !isOpen && !showLogo && setShowLogo(true);
    // Non-homepage: mobile nav open, already shown, then HIDE
    isOpen && showLogo && setShowLogo(false);
  }

  useEffect(
    () => () => {
      setShowLogo(false);
    },
    [],
  );

  return (
    <Box
      h={20}
      top={0}
      bg={bg}
      left={0}
      w="100%"
      right={0}
      as="header"
      pos="fixed"
      zIndex={1000}
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
        borderBottomColor={borderColor}
        justifyContent="space-between"
        {...rest}
      >
        <Link href="/" opacity={showLogo ? 1 : 0} mb={2}>
          <StellarLogo colorMode={colorMode} width="auto" height={navHeaderHeight} />
        </Link>
        {!isOpen && children}
      </Flex>
    </Box>
  );
};
