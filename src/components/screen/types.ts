import type { BoxProps } from "@chakra-ui/react";
import type { IVideo } from "~/components";

export type TScreen = Pick<IVideo, "config" | "style" | "url" | "enableControls"> &
  Omit<BoxProps, "style">;
