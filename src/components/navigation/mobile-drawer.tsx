import { Fragment } from "react";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import {
  Text,
  Flex,
  Stack,
  Drawer,
  HStack,
  Collapse,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  useColorMode,
  DrawerContent,
  useDisclosure,
  Icon as ChakraIcon,
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";
import { TitleCase } from "use-title-case";

import { Button, Controls, Icon, StatusButton, type ButtonProps } from "~/components";
import { ChevronUp, ExternalLink } from "~/icons";

import { MenuToggle } from "./menu-toggle";

import type { MenuProps, MenuSectionProps, HeaderProps, PopoverIconProps } from "./types";

const NavButton = (props: ChakraButtonProps & NextLinkProps & React.AnchorHTMLAttributes<"a">) => (
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

const PopoverIcon = (props: PopoverIconProps) => {
  const { isOpen, ...rest } = props;
  const iconStyles = {
    transform: isOpen ? undefined : "rotate(-180deg)",
    transition: "transform 0.2s",
    transformOrigin: "center",
  };
  return <ChakraIcon aria-hidden as={ChevronUp} __css={iconStyles} {...rest} />;
};

const MenuSection = (props: MenuSectionProps) => {
  const { title, subtitle, href, items, columns, menuTitle, onClose, ...rest } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex justify="space-between" direction="row">
        <ChakraButton
          size="lg"
          href={href}
          variant="ghost"
          _hover={{ bg: "none" }}
          _focus={{ bg: "none" }}
          _active={{ bg: "none" }}
          justifyContent="flex-start"
          as={href ? NextLink : undefined}
          onClick={href ? onClose : onToggle}
          color={isOpen ? "primary.500" : "inherit"}
          _dark={{ color: isOpen ? "tertiary.200" : "inherit" }}
        >
          <Text as="span">
            <TitleCase>{title}</TitleCase>
          </Text>
        </ChakraButton>
        <ChakraButton
          size="lg"
          width="100%"
          variant="ghost"
          onClick={onToggle}
          _hover={{ bg: "none" }}
          _focus={{ bg: "none" }}
          _active={{ bg: "none" }}
          justifyContent="flex-end"
        >
          <PopoverIcon
            isOpen={isOpen}
            color={isOpen ? "primary.500" : "inherit"}
            _dark={{ color: isOpen ? "tertiary.200" : "inherit" }}
          />
        </ChakraButton>
      </Flex>
      <Collapse in={isOpen} animateOpacity {...rest}>
        <Stack spacing="1" alignItems="stretch" ps={4}>
          {items.map(item => {
            const isExternal = item.showIcon && !item.icon && item.href.startsWith("http");
            return (
              <NavButton
                ps={6}
                size="sm"
                key={item.title}
                href={item.href}
                onClick={onClose}
                justifyContent="start"
                target={isExternal ? "_blank" : undefined}
                sx={{ "& > span.chakra-button__icon": { ms: 1 } }}
                rightIcon={
                  isExternal ? <Icon size={6} icon={ExternalLink} noBackground /> : undefined
                }
              >
                <TitleCase>{item.title}</TitleCase>
              </NavButton>
            );
          })}
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
    if (menu.sections.length <= 1) {
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
      <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="lg">
        <DrawerContent
          color="body-fg"
          backgroundColor="light.500"
          _light={{ boxShadow: "2xl" }}
          _dark={{
            backgroundColor: "blackAlpha.700",
            backdropFilter: "blur(8px)",
          }}
        >
          <DrawerHeader
            py={2}
            px={8}
            height={20}
            borderBottomWidth="1px"
            borderBottomStyle="solid"
            borderBottomColor="blackAlpha.300"
            _dark={{ borderBottomColor: "whiteAlpha.300" }}
          >
            <Flex align="center" justify="space-between" h="100%">
              <StellarLogo
                noAnimate
                height={56}
                width="100%"
                colorMode={colorMode}
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
                  <Fragment key={menu.title}>
                    {menu.href && menu.sections.length === 0 ? (
                      <ChakraButton
                        size="lg"
                        as={NextLink}
                        variant="ghost"
                        href={menu.href}
                        onClick={onClose}
                        justifyContent="start"
                      >
                        <Text as="span">
                          <TitleCase>{menu.title}</TitleCase>
                        </Text>
                      </ChakraButton>
                    ) : (
                      menu.sections.map(section => (
                        <MenuSection
                          {...section}
                          onClose={onClose}
                          title={menu.title}
                          key={section.title}
                        />
                      ))
                    )}
                  </Fragment>
                );
              })}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justify="space-between">
              <StatusButton fontSize={{ base: "md", md: "lg" }} size="16px" />
              <HStack>
                <LoginButton fontSize={{ base: "md", md: "lg" }} />
                <Controls.Mobile />
              </HStack>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
