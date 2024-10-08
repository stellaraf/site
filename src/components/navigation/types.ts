import type {
  MenuItemProps as ChakraMenuItemProps,
  MenuProps as ChakraMenuProps,
  ChakraProps,
  FlexProps,
  IconProps,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import type { LinkProps } from "~/components";
import type { ImageAsset } from "~/types";

export interface HeaderLogoProps {
  show: boolean;
}

export interface HeaderProps extends React.PropsWithChildren<ChakraProps> {
  menus: MenuProps[];
}

export interface DesktopNavLinkProps extends LinkProps {
  isActive?: boolean;
}

export interface MobileNavLinkProps extends LinkProps {
  title: string;
}

export interface BaseHeaderProps extends FlexProps {
  isOpen: UseDisclosureReturn["isOpen"];
  onToggle: UseDisclosureReturn["onToggle"];
  navHeaderHeight: number;
}

export interface MenuItemProps extends Omit<ChakraMenuItemProps, "icon"> {
  icon?: ImageAsset | null;
  title: string;
  description?: string | null;
  href: string;
  showIcon?: boolean;
}

export interface MenuSection {
  title: string;
  subtitle?: string | null;
  href?: string;
  items: MenuItemProps[];
  menuTitle: string;
}

export interface MenuProps extends Omit<ChakraMenuProps, "children"> {
  sections: MenuSection[];
  title: string;
  href?: string | null;
  columns?: number;
}

export type MenuSectionProps = MenuSection &
  Pick<MenuProps, "columns" | "href"> &
  Partial<Pick<UseDisclosureReturn, "onClose">>;

export interface PopoverIconProps extends IconProps {
  isOpen: boolean;
}
