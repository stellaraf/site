import type { BoxProps } from "@chakra-ui/react";
import type { IVideo } from "~/components";

export type ScreenProps = Pick<IVideo, "config" | "style" | "url" | "enableControls"> &
  Omit<BoxProps, "style">;
