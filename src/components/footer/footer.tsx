import dynamic from "next/dynamic";

import { Box, HStack, type StackProps, VStack } from "@chakra-ui/react";

import { Copyright } from "./copyright";
import { DesktopLinks } from "./desktop-links";
import { MobileLinks } from "./mobile-links";
import { SocialLinks } from "./social-links";

import type { FooterProps } from "./types";

const Subscribe = dynamic<StackProps>(
  () => import("~/components/subscribe").then(m => m.Subscribe),
  { ssr: false },
);

const DBottom = (props: StackProps) => (
  <HStack justify="space-between" align="flex-end" mb={12} mt={24} {...props}>
    <VStack align="flex-start" spacing={12}>
      <SocialLinks />
      <Copyright />
    </VStack>
    <Subscribe />
  </HStack>
);

const MBottom = (props: StackProps) => (
  <VStack justify="space-between" align="center" mb={8} mt={12} spacing={12} {...props}>
    <Subscribe width="100%" align="center" />
    <VStack align="flex-start" spacing={12}>
      <SocialLinks />
    </VStack>
    <Copyright />
  </VStack>
);

export const Footer = (props: FooterProps) => {
  const { groups, ...rest } = props;

  return (
    <Box
      pt={24}
      pb={12}
      w="100%"
      as="footer"
      color="white"
      bg="primary.800"
      layerStyle="container"
      _dark={{ bg: "dark.500" }}
      {...rest}
    >
      <MobileLinks groups={groups} display={{ lg: "none" }} />
      <DesktopLinks groups={groups} display={{ base: "none", lg: "grid" }} />
      <MBottom display={{ base: "flex", lg: "none" }} />
      <DBottom display={{ base: "none", lg: "flex" }} />
    </Box>
  );
};
