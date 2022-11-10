import { useContext, createContext } from "react";

import {
  Box,
  Icon,
  chakra,
  Button,
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { BoxProps, IconProps } from "@chakra-ui/react";

import { useColorValue } from "~/context";

const MobileSubNavContext = createContext<UseDisclosureReturn | null>(null);
export const useMobileSubNav = (): UseDisclosureReturn | null => useContext(MobileSubNavContext);

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

const Dots = (props: IconProps) => {
  return (
    <Icon
      width="64px"
      height="auto"
      strokeWidth={0}
      viewBox="0 0 1024 512"
      stroke="primary.200"
      _dark={{ stroke: "dark.700" }}
      {...props}
    >
      <chakra.circle fill="primary.200" _dark={{ fill: "dark.700" }} cx={256} cy={256} r={80} />
      <chakra.circle fill="primary.200" _dark={{ fill: "dark.700" }} cx={512} cy={256} r={80} />
      <chakra.circle fill="primary.200" _dark={{ fill: "dark.700" }} cx={768} cy={256} r={80} />
    </Icon>
  );
};

export const MSubNav = (props: BoxProps) => {
  const { children, ...rest } = props;
  // const { isOpen, onToggle, onClose } = useDisclosure();
  const disclosure = useDisclosure();

  const bg = useColorValue("light.500", "blackAlpha.300");
  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const colorScheme = useColorValue("primary", "dark");

  return (
    <Nav {...rest}>
      <Box mx="auto" mt={4} width="max-content">
        <MobileSubNavContext.Provider value={disclosure}>
          <Button
            onClick={disclosure.onToggle}
            borderRadius="1rem"
            colorScheme={colorScheme}
            aria-label="Open Sub-Navigation"
          >
            <Dots />
          </Button>
          <Drawer
            size="xs"
            placement="bottom"
            isOpen={disclosure.isOpen}
            onClose={disclosure.onClose}
          >
            <DrawerOverlay />
            <DrawerContent
              pt={2}
              bg={bg}
              height="md"
              borderTopWidth="1px"
              borderTopStyle="solid"
              borderTopColor={borderColor}
              css={{ backdropFilter: "blur(20px)" }}
            >
              <DrawerBody p={0} mt={2}>
                {children}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </MobileSubNavContext.Provider>
      </Box>
    </Nav>
  );
};
