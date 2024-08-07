import { useMemo, useRef } from "react";

import NextLink from "next/link";

import {
  Button,
  Menu as ChakraMenu,
  MenuItem as ChakraMenuItem,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuList,
  Portal,
  SimpleGrid,
  Text,
  VStack,
  chakra,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TitleCase } from "use-title-case";

import { Icon, StatusButton } from "~/components";
import { ExternalLink } from "~/icons";

import { useIsActive } from "./use-is-active";

import type { MenuItemProps, MenuProps, MenuSectionProps } from "./types";

const noFocus = {
  _focus: { border: "none", boxShadow: "none" },
  _focusVisible: { border: "none", boxShadow: "none" },
};

const activeAfterProps = {
  left: 0,
  right: 0,
  bottom: 0,
  width: "50%",
  height: "2px",
  content: `""`,
  marginLeft: "auto",
  marginRight: "auto",
  position: "absolute",
  borderRadius: "0.75rem",
  backgroundColor: "primary.500",
  opacity: 0.25,
  transform: "translateY(-10px)",
  transition: "width: 0.5s, opacity: 0.5s, transform 0.5s",
};
const activeDarkAfterProps = {
  backgroundColor: "tertiary.500",
  opacity: 0.25,
};

const NavButton = chakra(Button, {
  baseStyle: {
    py: 4,
    opacity: 0.7,
    pos: "relative",
    fontWeight: "medium",
    mr: { lg: 4, xl: 8 },
    _hover: { opacity: 1 },
    px: { lg: 3, "2xl": 6 },
    ...noFocus,
  },
});

const MenuItem = (props: Omit<MenuItemProps, "title" | "description">) => {
  const { icon, showIcon, href, children, ...rest } = props;
  const isExternal = showIcon && !icon && href.startsWith("http");
  return (
    <ChakraMenuItem
      href={href}
      as={NextLink}
      target={isExternal ? "_blank" : undefined}
      _dark={{ _hover: { bg: "whiteAlpha.100" } }}
      _hover={{ backgroundColor: "blackAlpha.100" }}
      css={{ "& .chakra-menu__icon-wrapper": { marginInlineEnd: 0 } }}
      icon={icon && !isExternal ? <Icon url={icon.url} size={12} noBackground /> : undefined}
      {...rest}
    >
      {children}
      {isExternal ? <Icon size={6} icon={ExternalLink} noBackground /> : undefined}
    </ChakraMenuItem>
  );
};

const MenuSection = (props: MenuSectionProps) => {
  const { title, subtitle, href, columns = 2, items } = props;
  return (
    <MenuGroup>
      {href && (
        <>
          <MenuItem href={href}>
            <VStack alignItems="flex-start" spacing={1}>
              <Text fontSize="lg" fontWeight="bold" _light={{ color: "primary.500" }}>
                <TitleCase>{title}</TitleCase>
              </Text>
              <Text fontSize="sm" fontWeight="light">
                {subtitle}
              </Text>
            </VStack>
          </MenuItem>
          <MenuDivider
            mx={-4}
            key={`${title}--divider-1`}
            _dark={{ bg: "tertiary.300", opacity: 0.5 }}
          />
        </>
      )}
      <SimpleGrid columns={columns}>
        {items.map(({ title, description, ...rest }) => (
          <MenuItem key={title} {...rest}>
            {description ? (
              <VStack alignItems="flex-start" spacing={1}>
                <Text fontSize="lg">
                  <TitleCase>{title}</TitleCase>
                </Text>
                <Text fontSize="xs" fontWeight="light">
                  {description}
                </Text>
              </VStack>
            ) : (
              <Text as={TitleCase} fontSize="lg" fontWeight="bold">
                {title}
              </Text>
            )}
          </MenuItem>
        ))}
      </SimpleGrid>
    </MenuGroup>
  );
};

export const Menu = (props: MenuProps) => {
  const { title, sections, href, columns = 2, ...rest } = props;
  const focusRef = useRef(null);
  const disclosure = useDisclosure();

  const colorScheme = useColorModeValue("primary", "whiteSolid");

  const slugs = useMemo(() => {
    let initial: string[] = [];
    if (href) {
      initial = [href];
    }
    return sections.reduce<string[]>((final, each) => {
      if (each.href && !final.includes(each.href)) {
        final = [...final, each.href];
      }
      return final;
    }, initial);
  }, [sections.length, href]);

  const isActive = useIsActive(...slugs);

  if (href && sections.length === 0) {
    // Direct Page Link
    return (
      <NavButton
        as={NextLink}
        href={href}
        _dark={{ _after: isActive ? activeDarkAfterProps : {} }}
        _after={isActive ? activeAfterProps : undefined}
      >
        <TitleCase>{title}</TitleCase>
      </NavButton>
    );
  }

  return (
    <ChakraMenu
      isLazy
      offset={[0, 0]}
      lazyBehavior="keepMounted"
      initialFocusRef={focusRef}
      {...disclosure}
      {...rest}
    >
      <MenuButton
        as={NavButton}
        height="unset"
        variant="unstyled"
        onMouseEnter={disclosure.onOpen}
        onMouseLeave={disclosure.onClose}
        _after={isActive ? activeAfterProps : undefined}
        _light={{ color: isActive ? "primary.500" : undefined }}
        _dark={{
          _after: isActive ? activeDarkAfterProps : {},
          fontWeight: isActive ? "bold" : "medium",
        }}
        {...noFocus}
      >
        {title}
      </MenuButton>
      <Portal>
        <MenuList
          p={4}
          ref={focusRef}
          color="body-fg"
          zIndex="overlay"
          borderRadius="lg"
          onFocus={disclosure.onOpen}
          backgroundColor="light.500"
          _light={{ boxShadow: "lg" }}
          borderColor="blackAlpha.300"
          onMouseEnter={disclosure.onOpen}
          onMouseLeave={disclosure.onClose}
          _dark={{
            borderColor: "whiteAlpha.300",
            backgroundColor: "blackAlpha.700",
            backdropFilter: "blur(10px)",
          }}
          sx={{
            "& .chakra-menu__group:not(:last-of-type)": { mb: 6 },
            "& .chakra-menu__menuitem": { borderRadius: "lg", background: "inherit" },
          }}
        >
          {sections.map(section => (
            <MenuSection key={section.title} columns={columns} {...section} />
          ))}
          {title === "Cloud" && (
            <>
              <MenuDivider
                mx={-4}
                key={`${title}--divider-1`}
                _dark={{ bg: "tertiary.300", opacity: 0.5 }}
              />
              <StatusButton variant="ghost" colorScheme={colorScheme} />
            </>
          )}
        </MenuList>
      </Portal>
    </ChakraMenu>
  );
};
