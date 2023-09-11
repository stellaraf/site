import { chakra } from "@chakra-ui/react";

import { shouldForwardProp } from "~/theme";

import type { BackdropProps } from "./types";

const Base = chakra("div", {
  shouldForwardProp,
  baseStyle: {
    zIndex: 1,
    mx: "auto",
    pos: "relative",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "lg",
    borderStyle: "solid",
    borderWidth: "0.1rem",
    borderColor: "blackAlpha.200",
    _dark: { borderColor: "whiteAlpha.300" },
    width: { base: "100%", lg: "75%", xl: "50%" },
  },
});

const Title = chakra("div", {
  shouldForwardProp,
  baseStyle: {
    py: 4,
    borderTopStyle: "solid",
    borderTopWidth: "0.1rem",
    borderTopColor: "blackAlpha.200",
    _dark: {
      borderTopColor: "whiteAlpha.300",
    },
    textAlign: "center",
  },
});

const ChildContainer = chakra("div", {
  shouldForwardProp,
  baseStyle: {
    p: 2,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const Backdrop = (props: BackdropProps) => {
  const { title, children, ...rest } = props;
  return (
    <Base {...rest}>
      <ChildContainer>{children}</ChildContainer>
      {title && <Title>{title}</Title>}
    </Base>
  );
};
