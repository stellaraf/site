import { Box, HStack, VStack } from "@chakra-ui/react";
import { SocialLinks } from "./SocialLinks";
import { DesktopLinks } from "./DesktopLinks";
import { MobileLinks } from "./MobileLinks";
import { Copyright } from "./Copyright";
import { Subscribe } from "./Subscribe";
import { MControls } from "~/components";
import { useColorValue } from "~/context";
import { useMobile, useResponsiveStyle } from "~/hooks";

import type { IFooter } from "./types";

const BottomDesktop: React.FC = () => {
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

const BottomMobile: React.FC = () => {
  return (
    <VStack justify="space-between" align="center" mb={8} mt={12} spacing={12}>
      <MControls />
      <Subscribe
        width="100%"
        align="center"
        alertPosition="top"
        alertProps={{ right: 0, mx: 4, top: 16 }}
      />
      <VStack align="flex-start" spacing={12}>
        <SocialLinks />
      </VStack>
      <Copyright />
    </VStack>
  );
};

export const Footer: React.FC<IFooter> = (props: IFooter) => {
  const { groups, ...rest } = props;
  const bg = useColorValue("primary.800", "dark.500");
  const color = useColorValue("white", "white");
  const rStyles = useResponsiveStyle();
  const isMobile = useMobile();
  return (
    <Box as="footer" pt={24} pb={12} w="100%" bg={bg} color={color} {...rStyles} {...rest}>
      {isMobile ? <MobileLinks groups={groups} /> : <DesktopLinks groups={groups} />}
      {isMobile ? <BottomMobile /> : <BottomDesktop />}
    </Box>
  );
};
