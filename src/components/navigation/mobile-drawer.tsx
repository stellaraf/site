import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import {
  Button as ChakraButton,
  Collapse,
  Text,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Stack,
  HStack,
  useDisclosure,
  useColorMode,
  type ButtonProps as ChakraButtonProps,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";
import { TitleCase } from "use-title-case";

import { Button, Controls, type ButtonProps } from "~/components";
import { ChevronUp } from "~/icons";

import { MenuToggle } from "./menu-toggle";

import type { MenuProps, MenuSectionProps, HeaderProps } from "./types";

const NavButton = (props: ChakraButtonProps & NextLinkProps) => (
  <ChakraButton
    py={4}
    as={NextLink}
    opacity={0.8}
    pos="relative"
    variant="ghost"
    fontWeight="medium"
    transition="all 0.2s"
    _focus={{ borderRadius: "lg" }}
    {...props}
  />
);

const LoginButton = (props: ButtonProps) => (
  <Button
    mr={8}
    w="100%"
    target="_blank"
    variant="outline"
    borderWidth="1px"
    colorScheme="primary"
    href="https://launch.stellar.tech"
    {...props}
  >
    Log In
  </Button>
);

const PopoverIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? undefined : "rotate(-180deg)",
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <Icon aria-hidden as={ChevronUp} __css={iconStyles} />;
};

const MenuSection = (props: MenuSectionProps) => {
  const { title, subtitle, href, items, columns, ...rest } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <ChakraButton justifyContent="space-between" variant="tertiary" size="lg" onClick={onToggle}>
        <Text as="span">
          <TitleCase>{title}</TitleCase>
        </Text>
        <PopoverIcon isOpen={isOpen} />
      </ChakraButton>
      <Collapse in={isOpen} animateOpacity {...rest}>
        <Stack spacing="1" alignItems="stretch" ps={4}>
          {items.map(item => (
            <NavButton key={item.title} href={item.href} size="sm" justifyContent="start" ps={6}>
              <TitleCase>{item.title}</TitleCase>
            </NavButton>
          ))}
        </Stack>
      </Collapse>
    </>
  );
};

export const MobileDrawer = (
  props: HeaderProps & Pick<UseDisclosureReturn, "isOpen" | "onToggle" | "onClose">,
) => {
  const { menus, isOpen, onToggle, onClose, ...rest } = props;
  const { colorMode } = useColorMode();
  const merged = menus.reduce<MenuProps[]>((final, menu) => {
    if (menu.sections.length === 1) {
      final = [...final, menu];
    } else {
      for (const section of menu.sections) {
        const existing = final.find(menu => menu.title === section.menuTitle);
        const newMenu: MenuProps = {
          title: existing ? section.title : section.menuTitle,
          sections: [section],
          href: section.href,
        };
        final = [...final, newMenu];
      }
    }
    return final;
  }, []);
  return (
    <>
      <MenuToggle
        isOpen={isOpen}
        onClick={onToggle}
        aria-label="Open menu"
        display={{ base: "inline-flex", lg: "none" }}
        {...rest}
      />
      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerContent
          color="body-fg"
          backgroundColor="light.500"
          _light={{ boxShadow: "2xl" }}
          _dark={{
            backgroundColor: "blackAlpha.700",
            backdropFilter: "blur(8px)",
          }}
        >
          <DrawerHeader>
            <Flex align="center" justify="space-between">
              <StellarLogo
                noAnimate
                width="auto"
                colorMode={colorMode}
                height={56}
                style={{ marginBlock: "0.5rem" }}
              />
              <MenuToggle
                isOpen={isOpen}
                onClick={onToggle}
                aria-label="Close menu"
                display={{ base: "inline-flex", lg: "none" }}
                {...rest}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody p={4}>
            <Stack spacing="1">
              {merged.map(menu => {
                return (
                  <>
                    {menu.href && menu.sections.length === 0 ? (
                      <NavButton
                        ps={4}
                        size="md"
                        key={menu.title}
                        href={menu.href}
                        justifyContent="start"
                      >
                        <TitleCase>{menu.title}</TitleCase>
                      </NavButton>
                    ) : (
                      menu.sections.map(section => (
                        <MenuSection key={section.title} {...section} title={menu.title} />
                      ))
                    )}
                  </>
                );
              })}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justify="flex-start">
              <LoginButton />
              <Controls.Mobile />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
