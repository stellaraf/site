import type { FlexProps, SimpleGridProps, UseDisclosureReturn } from "@chakra-ui/react";
import type { Bio } from "~/types";

export interface AvatarPhotoProps extends FlexProps {
  index: number;
  onOpen: UseDisclosureReturn["onOpen"];
}

export type AvatarPhotoWrapperProps = FlexProps;

export type AvatarsWrapperProps = SimpleGridProps;

export interface AvatarsProps extends SimpleGridProps {
  bios: Bio[];
}

export interface AvatarDetailProps {
  isOpen: UseDisclosureReturn["isOpen"];
  onClose: UseDisclosureReturn["onClose"];
}

export type AvatarHeaderProps = Omit<Bio, "body">;

export interface AvatarContextType {
  bios: Bio[];
}
