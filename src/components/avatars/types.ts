import type { FlexProps, SimpleGridProps, UseDisclosureReturn } from "@chakra-ui/react";
import type { Bio } from "~/types";

export interface AvatarPhotoProps extends FlexProps {
  index: number;
  onOpen: UseDisclosureReturn["onOpen"];
}

export interface AvatarPhotoWrapperProps extends FlexProps {}

export interface AvatarsWrapperProps extends SimpleGridProps {}

export interface AvatarsProps extends SimpleGridProps {
  bios: Bio[];
}

export interface AvatarDetailProps {
  isOpen: UseDisclosureReturn["isOpen"];
  onClose: UseDisclosureReturn["onClose"];
}

export interface AvatarHeaderProps extends Omit<Bio, "body"> {}

export interface AvatarContextType {
  bios: Bio[];
}
