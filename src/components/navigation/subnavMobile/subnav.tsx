import { Box, Icon, chakra, Button, Drawer, useToken, DrawerBody, useDisclosure, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import { useColorValue } from "~/context";

import type { IDots, IMSubNav } from "./types";

const Nav = chakra("nav", {
  baseStyle: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
    width: "full",
    position: "fixed",
    height: { base: 20, lg: 16 },
  },
});

const Dots: React.FC<IDots> = (props: IDots) => {
  const color = useColorValue(useToken("colors", "primary.200"), useToken("colors", "dark.700"));
  return (
    <Icon width="64px" height="auto" strokeWidth={0} viewBox="0 0 1024 512" stroke={color ?? "currentColor"} {...props}>
      <circle fill={color || "currentColor"} cx={256} cy={256} r={80} />
      <circle fill={color || "currentColor"} cx={512} cy={256} r={80} />
      <circle fill={color || "currentColor"} cx={768} cy={256} r={80} />
    </Icon>
  );
};

export const MSubNav: React.FC<IMSubNav> = (props: IMSubNav) => {
  const { children, ...rest } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();

  const bg = useColorValue("light.500", "blackAlpha.300");
  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const colorScheme = useColorValue("primary", "dark");

  return (
    <Nav {...rest}>
      <Box mx="auto" mt={4} width="max-content">
        <Button onClick={onToggle} borderRadius="1rem" colorScheme={colorScheme} aria-label="Open Sub-Navigation">
          <Dots />
        </Button>
        <Drawer size="xs" isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent pt={2} bg={bg} height="md" borderTopWidth="1px" borderTopStyle="solid" borderTopColor={borderColor} css={{ backdropFilter: "blur(20px)" }}>
            <DrawerBody p={0} mt={2}>
              {children}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Nav>
  );
};
