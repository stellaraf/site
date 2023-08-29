import { Box, HStack, VStack } from "@chakra-ui/react";

import { Controls, Subscribe } from "~/components";
import { useMobile, useResponsiveStyle } from "~/hooks";

import { Copyright } from "./copyright";
import { DesktopLinks } from "./desktop-links";
import { MobileLinks } from "./mobile-links";
import { SocialLinks } from "./social-links";

import type { FooterProps } from "./types";

const DBottom = () => {
  return (
    <HStack justify="space-between" align="flex-end" mb={12} mt={24}>
      <VStack align="flex-start" spacing={12}>
        <SocialLinks />
        <Copyright />
      </VStack>
      <Subscribe />
    </HStack>
  );
};

const MBottom = () => {
  return (
    <VStack justify="space-between" align="center" mb={8} mt={12} spacing={12}>
      <Controls.Mobile />
      <Subscribe width="100%" align="center" />
      <VStack align="flex-start" spacing={12}>
        <SocialLinks />
      </VStack>
      <Copyright />
    </VStack>
  );
};

export const Footer = (props: FooterProps) => {
  const { groups, ...rest } = props;

  const rStyles = useResponsiveStyle();
  const isMobile = useMobile();

  return (
    <Box
      pt={24}
      pb={12}
      w="100%"
      as="footer"
      color="white"
      bg="primary.800"
      _dark={{ bg: "dark.500" }}
      {...rStyles}
      {...rest}
    >
      {isMobile ? <MobileLinks groups={groups} /> : <DesktopLinks groups={groups} />}
      {isMobile ? <MBottom /> : <DBottom />}
    </Box>
  );
};
