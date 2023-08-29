import type { BoxProps } from "@chakra-ui/react";
import type { VideoProps } from "~/components";

export type ScreenProps = Pick<VideoProps, "url" | "enableControls" | "autoPlay"> &
  Omit<BoxProps, "style">;
