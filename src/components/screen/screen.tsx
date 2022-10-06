import { chakra } from "@chakra-ui/react";
import { Video } from "~/components";

import type { ScreenProps } from "./types";

const Container = chakra("div", {
  baseStyle: {
    zIndex: 1,
    bg: "dark.500",
    pos: "relative",
    boxShadow: "xl",
    cursor: "pointer",
    overflow: "hidden",
    borderStyle: "solid",
    borderColor: "dark.500",
    width: { base: "100%", lg: "75%" },
    minHeight: { base: 48, lg: "2xl" },
    borderRadius: { base: "1rem", lg: "2rem" },
    borderWidth: { base: "0.2rem", lg: "0.8rem" },
  },
});

export const Screen = (props: ScreenProps) => {
  const { url, enableControls = false, ...rest } = props;

  return (
    <Container {...rest}>
      <Video url={url} enableControls={enableControls} />
    </Container>
  );
};
